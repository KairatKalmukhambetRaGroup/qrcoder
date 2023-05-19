import express from "express";
import { activateAccount, changeEmail, changePassword, deleteUser, getUsers, login, register, resetPass, restore, sendActivationLink } from "../controllers/user.js";
import { auth, ifUser } from "../middleware/auth.js";

const router = express.Router();

router.post('/restore', restore);
router.post('/reset', resetPass);
router.get('/', getUsers);
router.patch('/changeEmail',auth, changeEmail);
router.patch('/changePass',auth, changePassword);
router.post('/login', login);
router.post('/register', register);
router.post('/activate', activateAccount);
router.delete('/:id', deleteUser)
router.post('/sendactivation', sendActivationLink);


export default router;