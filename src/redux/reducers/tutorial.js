import { OPEN_TUTORIAL, CLOSE_TUTORIAL } from "../actionTypes";

const initialState = {
    showTutorial: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_TUTORIAL:
            return {
                showTutorial: true
            }
        case CLOSE_TUTORIAL:
            return {
                showTutorial: false
            }
        default:
            return state;
    }
}