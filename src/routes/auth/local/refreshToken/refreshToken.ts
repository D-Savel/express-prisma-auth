import express from 'express';
import refreshToken from '../../../../controllers/auth/refreshToken';

const router = express.Router();

router.get('/auth/local/refreshToken', refreshToken);

export default router;