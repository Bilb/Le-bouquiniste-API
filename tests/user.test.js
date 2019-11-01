const request = require('supertest')
const app = require('../src/app')
const {setupDatabase, userOne, userTwo} = require('./fixtures/db')
const User = require('../src/models/user')

beforeEach(setupDatabase)



test('Should signup valid user', async () => {
    const response = await request(app).post('/users').send({
        name: "Audric Ackermann",
        email: "audric@example.org",
        password: "audric1234AZ"
    }).expect(201)

    const user = await User.findById(response.body.user._id)

    expect(user).not.toBeNull()
    expect(user.password).not.toBe('audric1234AZ')
    expect(response.body.user.password).toBeUndefined()
    expect(response.body).toMatchObject({
        user: {
            email: "audric@example.org",
            name: "Audric Ackermann",
        },
    })
})

test('Signup should fail with invalid password', async() => {
    const response = await request(app).post('/users').send({
        name: 'Audric Ackermann',
        email:' audric@example.org',
        password: '123456789' // invalid password, must contain char maj & min
    }).expect(400)
})


test('Signup should fail with existing user', async () => {
    const response = await request(app).post('/users').send({
        name: "Audric Ackermann",
        email: "audric1@example.org", // already exists
        password: "audric1234AZ"
    }).expect(400)
})


test('Valid login must work', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    expect(response.body).toMatchObject({
        user: {
            email: userOne.email,
            name: userOne.name,
            _id: userOne._id.toString()
        },
    })
})


test('Invalid password login fail', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userTwo.password
    }).expect(400)
})


test('Invalid email login fail', async () => {
    await request(app).post('/users/login').send({
        email: userTwo.email,
        password: userOne.password
    }).expect(400)
})


test('Can get /me with authentification', async() => {
    const response = await request(app).get('/users/me')
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send().expect(200)

    expect(response.body.email).toBe(userOne.email)
    expect(response.body._id).toBe(userOne._id.toString())
})
