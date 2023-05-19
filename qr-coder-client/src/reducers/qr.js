import { ADD_QRS_TO_USER, CLEAR_QR_STATUSES, CREATE_QR, DELETE_QR, FETCH_QR, FETCH_QRS, QR_COUNT, QR_LINK } from "../constants/actionTypes";

const qrReducers = (state = {
                    qr: null, qrLink: null, 
                    qrs: null,qrInitStatus:null, qrCreateStatus: null, qrAppendStatus: null,
                    total: 1, page: 1, count: 0, qrCount: 0    
                }, action) => {
    switch (action.type) {
        case CLEAR_QR_STATUSES: 
            return {...state, qrCreateStatus: null,qrInitStatus: null, qrAppendStatus: null};
        case QR_LINK:
            if(!localStorage.getItem('qr')){
                localStorage.setItem('qr', JSON.stringify(action.payload.data));
            }
            return {...state, qrCreateStatus: null, qrInitStatus: action.payload.status};
        case CREATE_QR:            
            return {...state, qr: action.payload.data, qrCreateStatus: action.payload.status};
        case ADD_QRS_TO_USER: 
            return {...state, qrAppendStatus: action.payload.status};
        case DELETE_QR:
        case FETCH_QRS:
            const res = action.payload.data;
            return {...state, qrs: res.qrs, total: res.totalPages, page: res.page, count: res.count, qrCount: res.count};
        case QR_COUNT:
            return {...state, qrCount: action.payload.data};
        case FETCH_QR:
            return {...state, qr: action.payload.data};
        case FETCH_QRS:
            return {...state, qrs: action.payload.data};
        default:
            return state;
    }
}

export default qrReducers;