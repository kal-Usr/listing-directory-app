const mongoose = require('mongoose')

const Schema= mongoose.Schema

const placeSchema = new Schema({
    title: String,
    location: String,
    description: String,
    price: Number,
    image: String
})

module.exports = mongoose.model('Place', placeSchema)