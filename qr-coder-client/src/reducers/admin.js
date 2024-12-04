import { FETCH_ALL_QRS } from "../constants/actionTypes";

const adminReducers = (state = {qrs: []}, action) => {
    switch (action.type) {
        case FETCH_ALL_QRS:
            const res = action.payload.data;
            return {...state, qrs: res.qrs, total: res.totalPages, page: res.page, count: res.count, qrCount: res.count};
        default:
            return state;
    }
}

export default adminReducers;