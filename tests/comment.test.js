const request = require('supertest')
const app = require('../src/app')
const Comment = require('../src/models/comment')

const { userOne, setupDatabase } = require('./fixtures/db')
const { dishOneId, setupDishes } = require('./fixtures/dish')
const { commentOneId, setupComments } = require('./fixtures/comment')

beforeAll(setupDatabase)
beforeAll(setupDishes)
beforeAll(setupComments)

test('Should not create new comment for invalid user', async () => {
    await request(app)
        .post(`/dishes/${dishOneId}/comments`)
        .send({
            rating: 2,
            comment: "Very bad",
        })
        .expect(401)
})

test('Should create new comment for valid user', async () => {
    const response = await request(app)
        .post(`/dishes/${dishOneId}/comments`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            rating: 2,
            comment: "Very bad",
        })
        .expect(201)

    const comment = await Comment.findById(response.body._id)
    expect(comment.author).toStrictEqual(userOne._id)
})

test('Should fetch all the comments for the dish', async () => {
    const response = await request(app)
        .get(`/dishes/${dishOneId}/comments`)
        // .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(1)
})

