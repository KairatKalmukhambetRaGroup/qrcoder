import * as api from '../api';
import { FETCH_ALL_QRS } from '../constants/actionTypes';

export const getAllQrs = (page) => async (dispatch) => {
    try {
        const data = await api.getAllQrs(page);
        dispatch({type: FETCH_ALL_QRS, payload: data});
    } catch (error) {
        console.log(error);
    }
}