import { combineReducers } from "redux";
import messages from "./messages";
import participants from "./participants";
import login from "./login";
import register from "./register";
import connect from "./connect";
import tutorial from "./tutorial";

export default combineReducers({ participants, messages, login,register,tutorial,connect});
