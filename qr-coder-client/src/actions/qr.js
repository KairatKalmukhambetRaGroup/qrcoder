import * as api from '../api';
import { ADD_QRS_TO_USER, CREATE_QR, DELETE_QR, FETCH_QR, FETCH_QRS, QR_COUNT, QR_LINK } from '../constants/actionTypes';

export const getQRLink = (type) => async (dispatch) => {
    try {
        const data = await api.getNewQRLink(type);
        dispatch({type: QR_LINK, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createQR = (id, type, formData) => async (dispatch) => {
    try {
        const data = await api.createQR(id, type, formData);
        dispatch({type: CREATE_QR, payload:data });
    } catch (error) {
        console.log(error);
    }
}

export const addQRToUser = (id) => async (dispatch) => {
    try {
        const data = await api.addLocalQRToUser(id);
        dispatch({type: ADD_QRS_TO_USER, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getQRs = (page) => async (dispatch) => {
    try {
        const data = await api.getQRs(page);
        dispatch({type: FETCH_QRS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getQR = (link) => async (dispatch) => {
    try {
        const data = await api.getQRcode(link)
        dispatch({type: FETCH_QR, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteQR = (link) => async (dispatch) => {
    try {
        const data = await api.deleteQRCode(link)
        dispatch({type: DELETE_QR, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getQRCount = () => async (dispatch) => {
    try {
        const data = await api.getQRCount();
        dispatch({type: QR_COUNT, payload: data});
    } catch (error) {
        console.log(error);
    }
}