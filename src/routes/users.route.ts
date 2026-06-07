

const createUser = async (c, next) => {
    const body = await c.req.json();
    const parsed = userSchema.parse(body)

    const {name, age, gender} = parsed;

    if (!name || !age || !gender) return c.json({ msg: 'Missing fields' }, 400)

    const newUser: User = {name: name, age: age, gender: gender}
    users.push(newUser);
    return c.json(users);
}