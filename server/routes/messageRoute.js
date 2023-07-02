import express from 'express';
import { getMessages, create } from '../controllers/messagesController.js';
const router = express.Router();

router.post('/get', getMessages);
router.post('/create', create);

export default router;
