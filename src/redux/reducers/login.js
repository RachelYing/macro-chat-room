import { LOGIN_REQUESTED, LOGIN_SUCCESSFUL, LOGIN_ERROR, LOGIN_INVALID, LOGOUT } from "../actionTypes";
import { LOGIN_STATUS } from "../../constants";
import { leaveRoom } from "../../client";

const initialState = {
    status: LOGIN_STATUS.LOGGED_OUT
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUESTED:
            return {
                status: LOGIN_STATUS.REQUESTED
            }
        case LOGIN_SUCCESSFUL:
            return {
                status: LOGIN_STATUS.SUCCESSFUL
            }
        case LOGIN_ERROR:
            return {
                status: LOGIN_STATUS.ERROR
            }
        case LOGIN_INVALID:
            return {
                status: LOGIN_STATUS.INVALID
            }
        case LOGOUT:
            leaveRoom();
            return initialState;
        default:
            return state;
    }
}