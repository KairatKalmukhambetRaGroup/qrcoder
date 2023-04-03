import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_DEV, validateStatus: function (status) { return true } });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// USERS
export const getUsers = () => API.get('/users');
export const login = (data) => API.post('/users/login', data);
export const register = (data) => API.post('/users/register', data);
export const sendActivationLink = (data) => API.post('/users/sendactivation', data);
export const activateUser = (data) => API.post('/users/activate', data);
export const deleteUser = (userID) => API.delete(`/users/${userID}`);

// QR
export const getQRs = (page) => API.get(`/qr?page=${page}`);
export const getNewQRLink = (type) => API.post('/qr', {type});
export const createQR = (id, type, formData) => API.post(`/qr/${id}`, {type, formData});
export const addLocalQRToUser = (id) => API.post('/qr/addlinks', {id});
export const getQRcode = (link) => API.get(`/qr/${link}`);
export const deleteQRCode = (link) => API.delete(`/qr/${link}`);