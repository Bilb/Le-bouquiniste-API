const request = require('supertest')
const app = require('../src/app')
const {setupDatabase, userOne, userTwo} = require('./fixtures/db')
const Sample = require('../src/models/sample')

beforeEach(setupDatabase)


test('Should fail if not logged in', async() => {
    await request(app).get('/users/samples').send().expect(403)
}) 


test('Should get user samples (none exists)', async() => {
    const response = await request(app)
        .get('/users/samples')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body).toMatchObject([])
})


test('Should get user samples (which exists)', async() => {
    const response = await request(app)
        .get('/users/samples')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body).not.toMatchObject([])
})
