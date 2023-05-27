const express = require('express');
const router = express.Router();
const productController = require('./../controllers/product.controller');
const isAdmin = require('../middlewares/isAdmin');
// obtener todos los productos:
router.get("/products", productController.getAllProducts);

// eliminar producto :
router.delete("/products/:id", productController.deleteProduct);

// añadir producto:
 router.post("/products", productController.addProduct);

//  obtener un producto especifico:
router.get("/products", productController.getProduct);

// modificar producto:
router.put("/products", productController.updateProduct);



module.exports = router;