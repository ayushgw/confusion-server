const mongoose = require('mongoose')

const favouriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dish: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Dish'
    }
})

favouriteSchema.statics.populateFavouritesArray = async (favourites) => {
    const getFavourite = async (favourite) => {
        await favourite.populate('dish').execPopulate()
        return favourite.dish
    }

    return await Promise.all(favourites.map(fav => getFavourite(fav)))
}

const Favourite = new mongoose.model('Favourite', favouriteSchema)

module.exports = Favourite