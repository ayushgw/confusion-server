const request = require('supertest')
const app = require('../src/app')
const Dish = require('../src/models/dish')

const { userOneId, userOne, setupDatabase } = require('./fixtures/db')
const { setupDishes } = require('./fixtures/dish')

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
    await request(app)
        .get('/dishes')
        .set('Authoriation', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})