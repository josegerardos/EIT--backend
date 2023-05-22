const express = require('express');
const router = express.Router();
const productController = require('./../controllers/product.controller');
// obtener todos los productos:
router.get("/products", productController.getAllProducts);

// eliminar producto :
router.delete("/product/:id", productController.deleteProduct);

// añadir producto:
 router.post("/product", productController.addProduct);

//  obtener un producto especifico:
router.get("/product", productController.getProduct);

// modificar producto:
router.put("/product", productController.updateProduct);


module.exports = router;