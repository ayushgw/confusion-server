const request = require('supertest')
const app = require('../src/app')

const { userOne, setupDatabase } = require('./fixtures/db')
const { dishOneId, setupDishes } = require('./fixtures/dish')

beforeAll(setupDatabase)
beforeAll(setupDishes)

test('Should not create dish for non admin user', async () => {
    await request(app)
        .post('/dishes')
        .set('Authoriation', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Japanese ramen noodle soup",
            category: "Japanese",
            image: "no image",
            price: "$8.99",
            description: "Use chicken, noodles, spinach, sweetcorn and eggs to make this moreish Japanese noodle soup, for when you crave something comforting yet light and wholesome"
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

test('Should not delete dishes for non admin user', async () => {
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
            name: "Changed dish"
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