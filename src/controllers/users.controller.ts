import { Hono } from 'hono';
import { createFactory } from 'hono/factory';
import type {User} from '../types/user';

const factory = createFactory<{Variables: {user: User}}>();