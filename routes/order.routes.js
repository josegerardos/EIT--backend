const express = require('express');
const router = express.Router() ;
const ordersController = require('../controllers/order.controller') ;
const isAdmin = require('../middlewares/isAdmin');
const jwtVerify = require('../middlewares/jwtVerify');


// GET guardar todas las ordenes (GET All) :
router.get('/orders', [ jwtVerify, isAdmin], ordersController.getOrders);

// GET guardar una orden es especifico (by id) :
router.get('/orders/:id', [ jwtVerify, isAdmin], ordersController.getOrderById);

// GET buscar ordenes por el id del usuario:
router.get('/orders/user/:id', [ jwtVerify, isAdmin], ordersController.getUserOrders);

// POST Create crear order añadir una orden:
router.post('/orders', [ jwtVerify, isAdmin], ordersController.createOrder);

// PUT modificar una orden :
router.put('/orders/:id', [ jwtVerify, isAdmin], ordersController.updateOrder);

// DELETE borrar una orden :
router.delete('/orders/:id', [ jwtVerify, isAdmin], ordersController.deleteOrder);





module.exports = router; 