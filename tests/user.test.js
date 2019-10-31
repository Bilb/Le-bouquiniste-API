const request = require('supertest')
const app = require('../src/app')
const {setupDatabase} = require('./fixtures/db')
const User = require('../src/models/user')

beforeEach(setupDatabase)



test('Should signup valid user', async () => {
    const response = await request(app).post('/users').send({
        name: "Audric Ackermann",
        email: "audric@example.org",
        password: "audric1234AZ"
    }).expect(201)

    const user = await User.findById(response.body._id)

    expect(user).not.toBeNull()
    expect(user.password).not.toBe('audric1234AZ')
    expect(response.body.password).toBeUndefined()
})

test('Signup should fail with invalid password', async() => {
    const response = await request(app).post('/users').send({
        name: 'Audric Ackermann',
        email:' audric@example.org',
        password: '123456789' // invalid password, must contain char maj & min
    }).expect(400)
})