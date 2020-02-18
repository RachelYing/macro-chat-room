import {UPDATE_MESSAGES } from "../actionTypes";

const initialState = {
  messages: []

};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_MESSAGES:
            return {messages: action.payload}
        default:
            return state;
  }
}