import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 6000) => dispatch => {
    const ID = uuid.v6();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, ID }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: ID }), timeout);
}