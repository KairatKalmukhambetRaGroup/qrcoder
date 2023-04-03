import express from "express";
import { activateAccount, deleteUser, getUsers, login, register, sendActivationLink } from "../controllers/user.js";

const router = express.Router();

router.get('/', getUsers);
router.post('/login', login);
router.post('/register', register);
router.post('/activate', activateAccount);
router.delete('/:id', deleteUser)
router.post('/sendactivation', sendActivationLink);

export default router;