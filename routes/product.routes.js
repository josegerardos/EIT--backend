const express = require('express');
const router = express.Router()
const productController = require('./../controllers/product.controller')
// obtener todos los productos:
router.get("/products", productController.getAllProducts)

// eliminar producto :
router.delete("/products", productController.deleteProduct)

module.exports = router