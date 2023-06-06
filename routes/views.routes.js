const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller');

// Deficion de todas las rutas o vistas y sus respectivos controladores :

router.get('/', (req, res) => res.render('index'));
router.get('/contact', (req, res) => res.render('contact'));
router.get('/register', (req, res) => res.render('register'));
router.get('/about-us', (req, res) => res.render('about-us'));
router.get('/login', (req, res) => res.render('login'));




router.get('/admin-product', (req, res) => res.render('admin-product'));
router.get('/admin-user', (req, res) => res.render('admin-user'));
router.get('/badge', (req, res) => res.render('badge'));
router.get('/order', (req, res) => res.render('order'));
router.get('/product-detail', (req, res) => res.render('product-detail'));
router.get('/admin-order', (req, res) => res.render('admin-order'));



module.exports = router;