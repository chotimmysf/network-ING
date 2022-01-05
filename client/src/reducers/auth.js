import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
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
        // Load & log in a user
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        // Response received, registration/login successful
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        // Response Received, remove token for auth fail/logout
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}