import { combineReducers } from "redux";

import users from "./users";
import qr from "./qr";

export default combineReducers({
    users, qr
});
