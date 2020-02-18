import { REGISTER_REQUESTED,REGISTER_FAILED, REGISTER_SUCCESSFUL } from "../actionTypes";
import { REGISTER_STATUS } from "../../constants";

const initialState = {
    status: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUESTED:
            return {
                status: REGISTER_STATUS.REQUESTED
            }
        case REGISTER_SUCCESSFUL:
            return {
                status: REGISTER_STATUS.SUCCESSFUL
            }
        case REGISTER_FAILED:
            return {
                status: REGISTER_STATUS.FAILED
            }
       
        default:
            return state;
    }
}