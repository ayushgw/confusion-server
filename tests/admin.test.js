const request = require('supertest')
const app = require('../src/app')
const Dish = require('../src/models/dish')
const Leader = require('../src/models/leader')

const { superUser, setupDatabase } = require('./fixtures/db')
const { dishOneId, setupDishes } = require('./fixtures/dish')
const { leaderOneId, setupLeaders } = require('./fixtures/leader')

beforeAll(setupDatabase)
beforeAll(setupDishes)
beforeAll(setupLeaders)

//  DISHES
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

// LEADERS
test('Should create new leader for admin user', async () => {
    const response = await request(app)
        .post('/leaders')
        .set('Authorization', `Bearer ${superUser.tokens[0].token}`)
        .set('X-SuperAuth', process.env.SUPERUSER_SECRET)
        .send({
            name: "New Leader",
            image: "images/new.png",
            designation: "new Taste Officer",
            abbr: "NEW",
            description: "New descrption for someone who doesn't exist."
        })
        .expect(201)

    const leader = await Leader.findById(response.body._id)
    expect(leader).not.toBeNull()
})

test('Should update leader for admin user', async () => {
    const response = await request(app)
        .patch(`/leaders/${leaderOneId}`)
        .set('Authorization', `Bearer ${superUser.tokens[0].token}`)
        .set('X-SuperAuth', process.env.SUPERUSER_SECRET)
        .send({
            description: "Description has been updated successfully"
        })
        .expect(200)

    const leader = await Leader.findById(leaderOneId)
    expect(leader.description).toBe("Description has been updated successfully")
})

test('Should delete leader for admin user', async () => {
    const response = await request(app)
        .delete(`/leaders/${leaderOneId}`)
        .set('Authorization', `Bearer ${superUser.tokens[0].token}`)
        .set('X-SuperAuth', process.env.SUPERUSER_SECRET)
        .send()
        .expect(200)

    const leader = await Leader.findById(leaderOneId)
    expect(leader).toBeNull()
})

test('Should delete all leaders for admin user', async () => {
    const response = await request(app)
        .delete(`/leaders`)
        .set('Authorization', `Bearer ${superUser.tokens[0].token}`)
        .set('X-SuperAuth', process.env.SUPERUSER_SECRET)
        .send()
        .expect(200)

    const leaders = await Leader.find()
    expect(leaders).toStrictEqual([])
})