import express from 'express';
import { logout } from '../../../../controllers/auth/logout.js';

const router = express.Router();

router.get('/auth/local/logout', logout);

export default router;
