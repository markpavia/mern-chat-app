import {
	getAllUsers,
	login,
	register,
	setAvatar,
} from '../controllers/usersController.js';

import express from 'express';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/set-avatar/:id', setAvatar);
router.get('/all-users/:id', getAllUsers);

export default router;
