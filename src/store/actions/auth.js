import * as actionType from './actionTypes';

const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: actionType.AUTH_SUCCESS,
        authData: authData
    }
}

const authFailed = (error) => {
    return {
        type: actionType.AUTH_FAILED,
        error: error
    }
}

export const auth = () => {
    return dispatch => {
        dispatch(authStart());
    }
}