const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const { responseCreator } = require('../utils/utils');


async function jwtVerify (req, res, next) {
    try{
    const token = req.headers.authorization;
    
    const payload = jwt.verify(token, secret);
    req.user = payload;
    // console.log('payload', payload)
    next();
    } catch (error) {
    console.log(error)
    return responseCreator(res, 401, 'Error al ingresar, token no válido')
    }

}

module.exports = jwtVerify;