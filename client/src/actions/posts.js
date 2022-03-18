import axios from 'axios';
import res from 'express/lib/response';
import { setAlert } from './alert';
import {
    ADD_POST,
    DELETE_POST,
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/API/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusTetx, status: err.response.status}
        });
    }
};

// Like a post/Add a like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`API/posts/like/${postId}`)
        
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Unlike a post/Remove a like
export const unlike = id => async dispatch => {
    try {
        const res = await axios.put(`API/posts/unlike/${postId}`)
        
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get a post
export const getPost = id => async dispatch => {
    try {
        await axios.post('API/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post created!', 'success'));
    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add a post
export const addPost = id => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        await axios.post('API/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post created!', 'success'));
    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete a post
export const deletePost = id => async dispatch => {
    try {
        const res = await axios.delete(`API/posts/${id}`)

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post removed sucessfully', 'success'));
    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};