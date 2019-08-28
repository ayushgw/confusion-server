// const { superUserId, superUser } = require('./db')
const Dish = require('../../src/models/dish')

const dishOne = {
    name: "Genthuk",
    image: "no image",
    category: "Tibetan",
    price: "$4.99",
    description: "Thenthuk with ginger base"
}

const dishTwo = {
    name: "Spring Rolls",
    image: "no image",
    category: "Tibetan",
    price: "$3.99",
    description: "Veggies & noodles rolled together in a flour and fried"
}

const setupDishes = async () => {
    await Dish.deleteMany()
    await new Dish(dishOne).save()
    await new Dish(dishTwo).save()
}

module.exports = {
    setupDishes
}