import { LOGIN, LOGOUT, UPDATE_PARTICIPANTS, REQUEST_ACCEPTED} from "../actionTypes";

const initialState = {
  currentUser: -1,
  selfId: "",
  userName: '',
  headPortrait:'',
  participants: {},

};

export default function (state = initialState,action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        currentUser: action.payload.currentUser,
        userName: action.payload.userName,
        // maybe ''
        headPortrait: action.payload.headPortrait,
      }
    }

    case LOGOUT: {
      return initialState
    }

    case REQUEST_ACCEPTED:
      return {
        ...state,
        selfId: action.payload.selfId,
        messages: action.payload.messages,
        messages: action.payload.messages,

      }

    case UPDATE_PARTICIPANTS:
      return {
        ...state,
        participants: action.payload
      }

    default:
      return state;
  }
}
