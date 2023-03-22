const app = require('./app');
const port = 4000;
const dbURL ='mongodb+srv://gerarsb6:Johana1234@josegerarardo-cluster.gskmbhb.mongodb.net/?retryWrites=true&w=majority'
const mongoose = require('mongoose');

mongoose.connect(dbURL).then(() => {
    console.log('\x1b[35m conexion a la mongoDB satisfactoria \x1b[37m');


    app.listen(port, () => {
        console.log(`\x1b[36m Servidor funcionando en puerto ${port} \x1b[37m `)
    })

}).catch((error) => {
    console.log(error)
})



