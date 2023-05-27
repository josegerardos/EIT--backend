const express = require('express');
const app = express();
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');

// middlewares:
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
extended:true
}));


// definir rutas a usar por mi app express :
app.use('/api', [ productRoutes, userRoutes ]);



module.exports = app;