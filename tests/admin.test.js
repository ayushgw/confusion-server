const request = require('supertest')
const app = require('../src/app')
const Dish = require('../src/models/dish')

const { superUser, superUserId, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create new dish for admin user', async () => {
    const response = await request(app)
    .post('/dishes')
    .set('Authorization', `Bearer ${superUser.tokens[0].token}`)
    .set('X-SuperAuth', process.env.SUPERUSER_SECRET)
    .send({
        name: "Japanese ramen noodle soup",
        category: "Tibetan",
        image: "no image",
        price: "$4.99",
        description: "Use chicken, noodles, spinach, sweetcorn and eggs to make this moreish Japanese noodle soup, for when you crave something comforting yet light and wholesome"
    })
    .expect(201)
})