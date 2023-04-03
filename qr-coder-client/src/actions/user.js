import * as api from '../api';
import { AUTH, CLEAR_USER_STATUS, REGISTER, USER_ACTIVATION } from '../constants/actionTypes';

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