const request = require('supertest')
const app = require('../src/app')

const { userOne, setupDatabase } = require('./fixtures/db')
const { promoOneId, setupPromos } = require('./fixtures/promo')

beforeAll(setupDatabase)
beforeAll(setupPromos)

test('Should not create new promo for non admin user', async () => {
    await request(app)
        .post('/promos')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Test Promo",
            image: "images/test.png",
            label: "Test",
            price: "10.99",
            description: "Test description"
        })
        .expect(401)
})

test('Should fetch all the promos', async () => {
    const response = await request(app)
        .get('/promos')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(1)
})

test('Should not delete promos for non admin user', async () => {
    await request(app)
        .delete('/promos')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401)
})

test('Should fetch promo using id', async () => {
    const response = await request(app)
        .get(`/promos/${promoOneId}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not update promo for non admin user', async () => {
    const response = await request(app)
        .patch(`/promos/${promoOneId}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Changed promo name"
        })
        .expect(401)
})

test('Should not delete promo for non admin user', async () => {
    await request(app)
        .delete(`/promos/${promoOneId}`)
        .set('Authoriation', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401)
})