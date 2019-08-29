const mongoose = require('mongoose')
const Promo = require('../../src/models/promo')

const promoOneId = new mongoose.Types.ObjectId()
const promoOne = {
    _id: promoOneId,
    name: "New Promo",
    image: "images/buffet.png",
    label: "Hot",
    price: "10.99",
    description: "Demo description"
}

const setupPromos = async () => {
    await Promo.deleteMany()
    await new Promo(promoOne).save()
}

module.exports = {
    promoOneId,
    setupPromos
}