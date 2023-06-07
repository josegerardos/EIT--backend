const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const jwtVerify = require('../middlewares/jwtVerify');
const isAdmin = require('../middlewares/isAdmin');

// GET-Leer todos los  usuarios:
router.get('/admin-user',  userController.getAllUsers);

// GET-Leer usuario:
router.get('/users/:id', [jwtVerify], userController.getUser);

// POST-Crear o añadir usuario:
router.post('/users', userController.postUser);

// DELETE-Borrar usuario:
router.delete('/users/:id', [ jwtVerify,  isAdmin ], userController.deleteUser);

// PUT-Actualizar usuario:
router.put('/users/:id', [ jwtVerify ],  userController.updateUser);

// Patch cambiar contraseña:
router.patch('/users/:id/password', userController.updatePassword); 

//POST-Login del usuario:
router.post('/login', userController.login);




module.exports = router;