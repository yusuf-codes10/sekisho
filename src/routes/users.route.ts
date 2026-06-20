import {Hono} from 'hono';
import type {Context, Next} from 'hono';
import type {User} from '../types/user';
import {userSchema} from '../types/user';
import { zValidator } from '@hono/zod-validator';
import { HTTPException } from 'hono/http-exception';

const route = new Hono();

const users : User[] = [
    {id: 1, name: 'Ella', age: 22, gender: 'F'},
    {id: 2, name: 'Veronica', age: 23, gender: 'F'},
    {id: 3, name: 'Jake', age: 25, gender: 'M'}
]


route.post('/', zValidator('json', userSchema), async (c: Context, next: Next) => {
    const body = await c.req.json();

    const {name, age, gender} = body;

    if (!name || !age || !gender) return c.json({ msg: 'Missing fields' }, 400)

    const newUser: User = {id: users.length + 1, name: name, age: age, gender: gender}
    users.push(newUser);
    return c.json(users);
});

route.get('/', (c: Context) => c.json(users));

route.get('/:id', (c: Context) => {
    const id = Number(c.req.param('id'));

    const foundUser = users.find(user => user.id === id);

    if(!foundUser) throw new HTTPException(404, {message: 'User does not exist!'});

    return c.json(foundUser, 200);
})

route.delete('/:id', (c: Context) => {
    const id = Number(c.req.param('id'));

    const index = users.findIndex(user => user.id === id);
    if (index === -1) throw new HTTPException(404, {message: 'User Does not exist!'});

    users.splice(index, 1);

    return c.json({msg: 'user has beed deleted!', users});
})

route.patch('/:id', async (c: Context) => {
    const id = Number(c.req.param('id'));
    const {name, age, gender} = await c.req.json();
    const foudUser = users.find(user => user.id === id);


})

export default route;
