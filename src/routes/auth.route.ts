import { Hono } from 'hono';
import type {User} from '../types/user';

const router = new Hono();

router.post('/');

export default router;