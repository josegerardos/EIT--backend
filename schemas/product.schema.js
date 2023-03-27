const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{type:String, required: true, minlegth: 3, maxlength: 30},
    price:{type: Number, required:true, min:0, max:100000000,},
    description: String
})

module.exports = mongoose.model('product', productSchema)