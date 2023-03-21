const express = require('express');
const app = express();
const port = 4000;

app.get('/', (request, response) =>{
    response.send({
        msg:'bienvenido a mi servidor espress',
        ok: true
    })
})

app.listen(port, () => {
    console.log(`Servidor funcionando en puerto ${port}`)
})