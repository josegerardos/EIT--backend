const express = require('express');
const app = express();
const viewsRoutes = require('./routes/views.routes');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
const categoryRoutes = require('./routes/category.routes');
const uploadRoutes = require('./routes/upload.routes');
const cors = require('cors');

// todo: Cargar configuración de plantillas de javaScript : 
app.set('view engine', 'ejs');

//todo: middlewares:
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
extended:true
}));
app.use(express.static("public"));

// Middleware para registrar las rutas consultadas
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
//   });
// todo :definir rutas a usar por mi app express :
app.use(viewsRoutes);
app.use('/api', [ productRoutes, userRoutes, orderRoutes, categoryRoutes, uploadRoutes,  ]);



module.exports = app;