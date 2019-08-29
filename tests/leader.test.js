const request = require('supertest')
const app = require('../src/app')

const { userOne, setupDatabase } = require('./fixtures/db')
const { leaderOneId, setupLeaders } = require('./fixtures/leader')

beforeAll(setupDatabase)
beforeAll(setupLeaders)

test('Should not create new leader for non admin user', async () => {
    await request(app)
        .post('/leaders')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "New Leader",
            image: "images/new.png",
            designation: "new Taste Officer",
            abbr: "NEW",
            description: "New descrption for someone who doesn't exist."
        })
        .expect(401)
})

test('Should fetch all the leaders', async () => {
    const response = await request(app)
        .get('/leaders')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(2)
})

test('Should not delete leaders for non admin user', async () => {
    await request(app)
        .delete('/leaders')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401)
})

test('Should fetch leader using id', async () => {
    const response = await request(app)
        .get(`/leaders/${leaderOneId}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not update leader for non admin user', async () => {
    const response = await request(app)
        .patch(`/leaders/${leaderOneId}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Changed Leader"
        })
        .expect(401)
})

test('Should not delete leader for non admin user', async () => {
    await request(app)
        .delete(`/leaders/${leaderOneId}`)
        .set('Authoriation', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401)
})