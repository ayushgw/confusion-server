const request = require('supertest')
const app = require('../src/app')
const Dish = require('../src/models/dish')

const { superUser, setupDatabase } = require('./fixtures/db')
const { dishOneId, setupDishes } = require('./fixtures/dish')

beforeAll(setupDatabase)
beforeAll(setupDishes)

test('Should create new dish for admin user', async () => {
    const response = await request(app)
        .post('/dishes')
        .set('Authorization', `Bearer ${superUser.tokens[0].token}`)
        .set('X-SuperAuth', process.env.SUPERUSER_SECRET)
        .send({
            name: "Japanese ramen noodle soup",
            category: "Japanese",
            image: "no image",
            price: "$8.99",
            description: "Use chicken, noodles, spinach, sweetcorn and eggs to make this moreish Japanese noodle soup, for when you crave something comforting yet light and wholesome"
        })
        .expect(201)

    const dish = await Dish.findById(response.body._id)
    expect(dish).not.toBeNull()
})

test('Should update dish for admin user', async () => {
    const response = await request(app)
        .patch(`/dishes/${dishOneId}`)
        .set('Authorization', `Bearer ${superUser.tokens[0].token}`)
        .set('X-SuperAuth', process.env.SUPERUSER_SECRET)
        .send({
            description: "Description has been updated successfully"
        })
        .expect(200)

    const dish = await Dish.findById(dishOneId)
    expect(dish.description).toBe("Description has been updated successfully")
})

test('Should delete dish for admin user', async () => {
    const response = await request(app)
        .delete(`/dishes/${dishOneId}`)
        .set('Authorization', `Bearer ${superUser.tokens[0].token}`)
        .set('X-SuperAuth', process.env.SUPERUSER_SECRET)
        .send()
        .expect(200)

    const dish = await Dish.findById(dishOneId)
    expect(dish).toBeNull()
})

test('Should delete all dishes for admin user', async () => {
    const response = await request(app)
        .delete(`/dishes`)
        .set('Authorization', `Bearer ${superUser.tokens[0].token}`)
        .set('X-SuperAuth', process.env.SUPERUSER_SECRET)
        .send()
        .expect(200)

    const dishes = await Dish.find()
    expect(dishes).toStrictEqual([])
})