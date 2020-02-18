import { REQUEST_TO_JOIN, REQUEST_ACCEPTED, REQUEST_DENIED } from "../actionTypes";

const initialState = {
    isRequesting: false,
    isConnected: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_TO_JOIN:
            return {
                ...state, 
                isRequesting: true
            }
        case REQUEST_ACCEPTED:
            return {
                isRequesting:false,
                isConnected:true
            }
        case REQUEST_DENIED:
            return initialState;
        default:
            return state;
    }
}