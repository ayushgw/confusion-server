const request = require('supertest')
const app = require('../src/app')
const Dish = require('../src/models/dish')

const { userOne, setupDatabase } = require('./fixtures/db')
const { dishOneId, setupDishes } = require('./fixtures/dish')

beforeEach(setupDatabase)
beforeEach(setupDishes)

test('Should not create dish for non admin user', async () => {
    await request(app)
        .post('/dishes')
        .set('Authoriation', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Genthuk",
            description: "Thenthuk with ginger base",
            category: "Tibetan",
            image: "no image",
            price: "$4.99"
        })
        .expect(401)
})

test('Should fetch all dishes', async () => {
    const response = await request(app)
        .get('/dishes')
        .set('Authoriation', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(2)
})

test('Should not delete dish for non admin user', async () => {
    await request(app)
        .delete('/dishes')
        .set('Authoriation', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401)
})

test('Should fetch dish using id', async () => {
    const response = await request(app)
        .get(`/dishes/${dishOneId}`)
        .set('Authoriation', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.name).toBe("Genthuk")
})

test('Should not update dish for non admin user', async () => {
    await request(app)
        .patch(`/dishes/${dishOneId}`)
        .set('Authoriation', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Changed"
        })
        .expect(401)
})

test('Should not delete dish for non admin user', async () => {
    await request(app)
        .delete(`/dishes/${dishOneId}`)
        .set('Authoriation', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401)
})