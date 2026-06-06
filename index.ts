import {Hono} from 'hono';
import {logger} from 'hono/logger';

const app = new Hono();

app.use(logger());

app.get('/', (c) => c.text('Hono is running'));

export default {
  port: 5200,
  fetch: app.fetch,
};