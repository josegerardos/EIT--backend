const express = require('express');
const app = express();
const productRoutes = require('./routes/product.routes');

// middlewares:
app.use(express.json()); 
app.use(express.urlencoded({
    extended:true
}));


app.get('/', (request, response) =>{
    response.send({
    msg:'bienvenido a mi servidor espress',
    ok: true
        });
});

// definir rutas a usar por mi app express :
app.use(productRoutes);



module.exports = app