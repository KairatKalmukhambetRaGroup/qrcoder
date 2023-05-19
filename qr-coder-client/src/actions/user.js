import * as api from '../api';
import { AUTH, CHANGE_EMAIL, CHANGE_PASSWORD, CLEAR_USER_STATUS, REGISTER, RESET_PASSWORD, RESTORE_ACCOUNT, USER_ACTIVATION } from '../constants/actionTypes';

export const login = (formData) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_USER_STATUS});
        const data = await api.login(formData);
        dispatch({type: AUTH, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_USER_STATUS});
        const data = await api.register(formData);
        dispatch({type: REGISTER, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const sendActivationLink = (email, lang) => async (dispatch) => {
    try {
        console.log(lang)
        dispatch({type: CLEAR_USER_STATUS});
        const data = await api.sendActivationLink({email, lang});
        dispatch({type: REGISTER, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const activateAccount = (token) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_USER_STATUS});
        const data = await api.activateUser({activationToken: token});
        dispatch({type: USER_ACTIVATION, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const changeEmail = (formData) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_USER_STATUS});
        const data = await api.changeEmail(formData);
        dispatch({type: CHANGE_EMAIL, payload: {...data, type: 'email'}});
    } catch (error) {
        console.log(error);
    }
}

export const changePass = (formData) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_USER_STATUS});
        const data = await api.changePass(formData);
        dispatch({type: CHANGE_PASSWORD, payload: {...data, type: 'password'}});
    } catch (error) {
        console.log(error);
    }
}


export const restoreAccount = (formData) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_USER_STATUS});
        const data = await api.restoreAccount(formData);
        dispatch({type: RESTORE_ACCOUNT, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const resetPassword = (formData) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_USER_STATUS});
        const data = await api.resetPass(formData);
        dispatch({type: RESET_PASSWORD, payload: data});
    } catch (error) {
        console.log(error);
    }
}