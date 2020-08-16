import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED
} from '../Actions/types'

const INITIAL_STATE = {
    loader: true,
    user: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_START:
        case SIGNUP_START:
            return {
                ...state,
                loader: false
            }
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case LOGIN_FAILED:
        case SIGNUP_FAILED:
            return {
                ...state,
                loader: false
            }
        default:
            return state;
    }
}