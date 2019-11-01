const request = require('supertest')
const app = require('../src/app')
const {setupDatabase, userOne, userTwo, sampleOne} = require('./fixtures/db')
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


test('Can get my sample by id', async() => {
    const rsp = await request(app)
        .get(`/users/samples/${sampleOne._id}`)
        .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
        .send()
        .expect(200)
})


test('Cannot get a sample I do not posses', async () => {
    const rsp = await request(app)
        .get('/users/samples/' + sampleOne._id)
        .set('Authorization', 'Bearer ' + userTwo.tokens[0].token)
        .send()
        .expect(404)
    
    console.log(rsp.body)
})