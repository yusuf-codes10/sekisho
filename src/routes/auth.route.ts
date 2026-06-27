import { Hono } from 'hono';
import { registerUser, logUserIn } from '../controllers/auth.controller';
import { authLimiter } from '../middlewares/authLimiter';

const router = new Hono();

router.post('/register', authLimiter, ...registerUser);

router.post('/login', authLimiter,  ...logUserIn);

router.post('/logout');

router.post('/refresh');

export default router;