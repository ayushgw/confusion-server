const mongoose = require('mongoose')

const leaderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        trim: true,
        required: true
    },
    abbr: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const Leader = mongoose.model('Leader', leaderSchema)

module.exports = Leader