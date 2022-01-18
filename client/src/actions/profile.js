import { setAlert } from './alert';
import axios from 'axios';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get profile of current user
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/API/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
        
    }
}