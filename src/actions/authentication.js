import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';
import axios from 'axios';

/* ====== AUTH ====== */

/* LOGIN */
export function loginRequest(username, password) {
	const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    var formData = new FormData();
    formData.append('id',username);
    formData.append('passwd',password);
	console.log("loginRequest ==========username : " + username );
    return (dispatch) => {
            dispatch(login());
            
            return axios.post('/api/login',  formData , config)
            .then((response) => {
            	if(response.data.errorcode == '0000'){
            		dispatch(loginSuccess(username));
            	}else{
                    dispatch(loginFailure());
                }
            }).catch((error) => {
            	console.log("loginRequest ==========error : " + error );
                dispatch(loginFailure());
            });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

/* REGISTER */
export function registerRequest(username, password) {
    return (dispatch) => {
        // inform register API is starting
        dispatch(register());

        return axios.post('/api/registUser', { username, password })
        .then((reponse) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            dispatch(registerFailure(error.response.data.code));
        });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

/* GET STATUS */

export function getStatusRequest() {
    return (dispatch) => {
        dispatch(getStatus());
        return axios.get('/api/account/getinfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.info.username));
        }).catch((error) => {
            dispatch(getStatusFailure());
        });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(username) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        username
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}


/* LOGOUT */
export function logoutRequest() {
    return (dispatch) => {
        return axios.post('/api/account/logout')
        .then((response) => {
            dispatch(logout());
        });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}
