import { Hono } from 'hono';
import type {User} from '../types/user';
import { registerUser } from '../controllers/auth.controller';

const router = new Hono();

router.post('/register', ...registerUser);

router.post('login');

router.post('logout');

router.post('/refresh');

export default router;