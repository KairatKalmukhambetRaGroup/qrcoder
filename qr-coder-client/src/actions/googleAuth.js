import axios from "axios"
import { AUTH, CLEAR_USER_STATUS } from "../constants/actionTypes";
import * as api from '../api';

export const googleAuth = (formData) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_USER_STATUS});
        const data = await api.googleAuth(formData);
        dispatch({type: AUTH, payload: data});
    } catch (error) {
        console.log(error);
    }
}