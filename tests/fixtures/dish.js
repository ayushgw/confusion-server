const mongoose = require('mongoose')
const Dish = require('../../src/models/dish')

const dishOneId = new mongoose.Types.ObjectId()
const dishOne = {
    _id: dishOneId,
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
    dishOneId,
    setupDishes
}