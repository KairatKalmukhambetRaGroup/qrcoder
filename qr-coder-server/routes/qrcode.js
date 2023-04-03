import express from "express";
import { appendToUser, createQRCode, deleteQR, getNewQrLink, getQRcode, getQRcodes } from "../controllers/qrcode.js";
import { auth, ifUser } from "../middleware/auth.js";

const router = express.Router();

router.get('/:link',  getQRcode);
router.get('/', auth, getQRcodes);
router.post('/addlinks', auth, appendToUser);
router.post('/:id', ifUser, createQRCode);
router.post('/', getNewQrLink);

router.delete('/:link', auth, deleteQR);

export default router;