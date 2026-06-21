import { Hono } from 'hono';
import type {User} from '../types/user';

const router = new Hono();

router.post('/register');

router.post('login');

router.post('logout');

router.post('/refresh');

export default router;