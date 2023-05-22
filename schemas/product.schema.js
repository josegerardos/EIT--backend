const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{type:String, required: true, minlegth: 3, maxlength: 30},
    price:{type: Number, required:true, min:0, max:100000000,},
    description:{ type:String, required:true, maxlength:4000},
    date:{type:Date, default: Date.now},
});

module.exports = mongoose.model('product', productSchema);