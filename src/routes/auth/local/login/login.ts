import express from 'express';
import { login } from '../../../../controllers/auth/login';

const router = express.Router();

router.post('/auth/local/login', login);

export default router;