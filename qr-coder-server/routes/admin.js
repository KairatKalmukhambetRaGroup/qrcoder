import express from 'express';
import { getAllQRCodes } from '../controllers/admin.js';

const router = express.Router();

router.get('/qr', getAllQRCodes);

export default router;