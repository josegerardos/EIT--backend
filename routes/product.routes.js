const express = require('express');
const router = express.Router();
const productController = require('./../controllers/product.controller');
const isAdmin = require('../middlewares/isAdmin');
const uploadController = require('../controllers/upload.controller');
const jwtVerify = require('../middlewares/jwtVerify');

// obtener todos los productos:
router.get("/products",   productController.getAllProducts);

// eliminar producto :
router.delete("/products/:id", [ jwtVerify, isAdmin ] ,   productController.deleteProduct);

// añadir producto:
 router.post("/product", [ jwtVerify, isAdmin ],  uploadController.uploadProduct,  productController.addProduct);

//  obtener un producto especifico:
router.get("/product", productController.getProduct);

// modificar producto:
router.put("/products/:id", [ jwtVerify, isAdmin ],  productController.updateProduct);



module.exports = router;