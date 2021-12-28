import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        // Response received, registration successful
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        // Response Received, registration failed
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}