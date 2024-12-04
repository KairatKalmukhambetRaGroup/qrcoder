import { combineReducers } from "redux";

import users from "./users";
import qr from "./qr";
import admin from './admin';

export default combineReducers({
    users, qr, admin
});
