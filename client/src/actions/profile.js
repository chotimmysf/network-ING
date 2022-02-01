import { setAlert } from './alert';
import axios from 'axios';

import { DELETE_ACCOUNT, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

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
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res =  await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated.' : 'Profile Created.', 'success'));

        if(!edit) {
            history.push('/dashboard');
        }
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res =  await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Your experience has been published.', 'success'));

        history.push('/dashboard');
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res =  await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Your education has been added to your profile.', 'success'));
        
        history.push('/dashboard');
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/API/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience has been deleted.', 'success'))
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`API/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education has been deleted.', 'success'))
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Delete account & profile
export const deleteAccount = id => async dispatch => {
    if(window.confirm('Your account and all its data will be deleted and not be recoverable. Are you sure you want to proceed?')) {
        try {
            const res = await axios.delete(`API/profile`);
    
            dispatch({
                type: DELETE_PROFILE,
                type: ACCOUNT_DELETED
            });
    
            dispatch(setAlert('Your account has been deleted.'))
        } catch(err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }
};