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
export const changeEmail = (data) => API.patch('/users/changeEmail', data);
export const changePass = (data) => API.patch('/users/changePass', data);

export const restoreAccount = (data) => API.post('/users/restore', data);
export const resetPass = (data) => API.post('/users/reset', data);

// QR
export const getQRs = (page) => API.get(`/qr?page=${page}`);
export const getNewQRLink = (type) => API.post('/qr', {type});
export const createQR = (id, type, formData) => API.post(`/qr/${id}`, {type, formData});
export const addLocalQRToUser = (id) => API.post('/qr/addlinks', {id});
export const getQRcode = (link) => API.get(`/qr/${link}`);
export const deleteQRCode = (link) => API.delete(`/qr/${link}`);
export const getQRCount = () => API.get('/qr/count');


// GOOGLE AUTH
export const googleAuth = (user) => API.post('/auth/google', user);

// ADMIN
export const getAllQrs = (page) => API.get(`/admin/qr?page=${page}`);