const product = require('./../schemas/product.schema')

const getAllProducts = (req, res) => {

    product.find().then(function(productos){
        res.status(200).send({

        msg:'productos obtenidos correctamente',
        productos: productos

    }).catch((error)=>{
        console.log(error)
    })

    })
}



function deleteProduct(req, res){
    res.status(200).send('producto borrado correctamente!!!')
}



module.exports = {
    getAllProducts,
    deleteProduct
}