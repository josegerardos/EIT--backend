const express = require('express');
const router = express.Router() ;
const ordersController = require('../controllers/order.controller') ;
const isAdmin = require('../middlewares/isAdmin');


// GET guardar todas las ordenes (GET All) :
router.get('/orders', isAdmin, ordersController.getOrders);

// GET guardar una orden es especifico (by id) :
router.get('/orders/:id', isAdmin, ordersController.getOrderById);

// GET buscar ordenes por el id del usuario:
router.get('/orders/user/:id', isAdmin, ordersController.getUserOrders);

// POST Create crear order añadir una orden:
router.post('/orders', isAdmin, ordersController.createOrder);

// PUT modificar una orden :
router.put('/orders/:id', isAdmin, ordersController.updateOrder);

// DELETE borrar una orden :
router.delete('/orders/:id', [isAdmin], ordersController.deleteOrder);





module.exports = router; 