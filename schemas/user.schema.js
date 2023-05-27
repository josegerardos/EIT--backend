const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

fullName:{ type:String, required: true, minlength: 6, maxlegth:140 },
email:{ type:String, required: true, minlength:6, maxlegth:150, unique: true, index: true, validate: { validator: function(value){return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) },message: props => `${props.value} No es un email válido `} },
password:{type: String, required: true, minlength: 8, maxlegth: 150 },
role: {type: String, required: true, default:'CLIENT_ROLE', enum: ['CLIENT_ROLE', 'USER_ROLE', 'ADMIN_ROLE' ] },
gender: {type: String, },
date:{type: Date}, 
Image: {type: String},
createdAt: {type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);