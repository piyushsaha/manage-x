const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    item_name: {type: String, required: true, unique: true},
    price: {type: String, required: true},
    quantity: {type: Number, required: true},
}, {timestamps: true})

module.exports = mongoose.model('Item', itemSchema)