import { createFactory } from "hono/factory";
import type {User} from '../types/user';

const factor = createFactory<{Variables: {user: User}}>();

export const registerUser = factor.createHandlers((c) => {
    return c.json({msg: 'hey'});
})