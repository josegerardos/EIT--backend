
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {
            productId: {type: Schema.Types.ObjectId, ref:'Product', required: true },
            quantity: {type:Number, required: true, default: 1},
            price: {type:Number, required: true, min:1 }
            
        }
    ],
    total: {type: Number, required:true, min:1 },
    userId: {type: Schema.Types.ObjectId, ref:'User', required: true},
    createdAt:{type: Date, required: true, default: Date.now },
    status: { type: String, enum:[ 'onhold', 'inprogress', 'done'], default:'onhold'},
    // updateAt: cuando se cambio el status 
    // metodo de pago
    // estado del pago
    // direccion de delivery 

});

module.exports = mongoose.model('Order', orderSchema);