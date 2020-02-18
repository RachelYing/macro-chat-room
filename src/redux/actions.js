import { UPLOAD_FAIL, REGISTER, REGISTER_REQUESTED, REGISTER_SUCCESSFUL, REGISTER_FAILED, LOGIN, LOGOUT, LOGIN_INVALID, LOGIN_SUCCESSFUL, REQUEST_ACCEPTED, REQUEST_TO_JOIN, LOGIN_REQUESTED, LOGIN_ERROR, UPDATE_MESSAGES, UPDATE_PARTICIPANTS, OPEN_TUTORIAL, CLOSE_TUTORIAL } from "./actionTypes";
import { joinGame } from "../client";

import firebase from "../data/fbConfig"
import 'firebase/firestore';
import 'firebase/storage';

export const login = (user) => ({
  type: LOGIN,
  payload: user
})

const registerRequested = () => ({ type: REGISTER_REQUESTED });

const registerNewUserSuccessful = () => ({
  type: REGISTER_SUCCESSFUL,
})

const registerNewUserFailed = () => ({
  type: REGISTER_FAILED,
})

export const logout = () => ({ type: LOGOUT });

export const loginSuccessful = () => ({ type: LOGIN_SUCCESSFUL });

export const invalidLogin = () => ({ type: LOGIN_INVALID });

export const loginRequested = () => ({ type: LOGIN_REQUESTED });

export const uploadFailed = () => ({ type: UPLOAD_FAIL })

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error
})

const requested = () => {
  return ({ type: REQUEST_TO_JOIN })
}

const requestAccepted = result => {
  return (
    {
      type: REQUEST_ACCEPTED,
      payload: {
        selfId: result.clientId,
        participants: result.participants,
        messages: result.messages,
      }
    })
}

const joinRoom = (userName, headPortrait) => {
  return dispatch => {
    dispatch(requested())
    joinGame(userName, headPortrait, result => {
      dispatch(requestAccepted(result));
    })
  }
}


export const validateLogin = (userName, password) => {
  return dispatch => {
    dispatch(loginRequested());
    const database = firebase.firestore();
    database.collection("users").where("username", "==", userName).where("password", "==", password)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 1) {
          const doc = querySnapshot.docs[0];
          const user = {
            currentUser: doc.id,
            userName: userName,
            headPortrait: doc.get('headportrait'),
          }
          dispatch(loginSuccessful())
          // join the room after log in
          dispatch(joinRoom(userName, doc.get('headportrait')))
          dispatch(login(user));
        }
        else {
          dispatch(invalidLogin());
        }
      })
      .catch(error => {
        dispatch(loginError(error))
      });
  }
}

export const updateMessages = messages => {
  return (
    {
      type: UPDATE_MESSAGES,
      payload: messages
    })
}

export const updateParticipants = participantS => {
  return (
    {
      type: UPDATE_PARTICIPANTS,
      payload: participantS
    })
}

export const register = (userName, password, filePath = undefined, file = undefined) => {

  return dispatch => {
    dispatch(registerRequested());
    if (filePath !== undefined && file !== undefined) {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const img = storageRef.child(filePath);
      img.put(file)
        .then(result => {

          img.getDownloadURL()
            .then(function (url) {

              dispatch(cregisterWithHeadPortrait(userName, password, url));
            })
            .catch(error => {
              console.log(error);
              dispatch(uploadFailed());
            })
        })
        .catch(error => {
          console.log(error);
          dispatch(uploadFailed());
        })
    } else {
      const database = firebase.firestore();
      database.collection("users")
        .add({
          username: userName,
          password: password,
        })
        .then(newDoc => {
          newDoc.id.length > 0 ?
            dispatch(registerNewUserSuccessful()) :
            dispatch(registerNewUserFailed());
        })
    }
  }
};

const cregisterWithHeadPortrait = (userName, password, imageUrl) => {
  return dispatch => {
    const database = firebase.firestore();
    database.collection("users")
      .add({
        username: userName,
        password: password,
        headportrait: imageUrl,
      })
      .then(newDoc => {
        newDoc.id.length > 0 ?
          dispatch(registerNewUserSuccessful()) :
          dispatch(registerNewUserFailed());
      })
  }
}

export const closeTutorial = () => {
  console.log('closeTutorialcloseTutorialcloseTutorial');
  return {
    type: CLOSE_TUTORIAL
  }
}

export const openTutorial = () => {
  console.log('openTutorialcloseTutorialcloseTutorial');
  return {
    type: OPEN_TUTORIAL
  }
}

