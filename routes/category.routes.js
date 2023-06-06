const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// leer todas las categorias :
router.get('/category', categoryController.getCategory );

// Crear catagoria :
router.post('/category', categoryController.createCategory);

// Borrar categoria :
router.delete('/category/:id', categoryController.deleteCategory);

// Modificar una categoria :
router.put('/category', categoryController.updateCategory);



module.exports = router;