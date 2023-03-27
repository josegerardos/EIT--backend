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

function addProduct(req, res) {
    const Product = new product(req.body)
    Product.save().then(function(Product) {
        return res.status(200).send({
            msg:'Producto guardado correctamente',
            Product
        })

    }).catch(error =>{
        console.log(error)
        res.status(500).send('El producto no se pudo guardar')
    })
   
}



function deleteProduct(req, res){
    const id = req.params.id
    product.findByIdAndDelete(id).then((deleted) => {
        if(!deleted){
           return res.status(404).send({
            msg:'No se encontro el producto que se quiere borrar',
            deleted
           })
        }
          return res.status(200).send({
                msg:'Producto borrado correctamente',
                deleted
            })
    }).catch(error =>{
        console.log(error)
        return res.status(500).send({
            msg:'Error al borrar el producto',
            deleted
        })
    })
}

function getProduct(req,res){
    const id = req.query.id;

    if(!id){
        return res.status(400).send({

            msg:'Es necesario que mande un id'
        })
    }
    product.findById(id).then((product) => {
        // dos casos posibles si se hace bien la peticion :
        // a-el id proporcionado no corresponde a ningun producto :
        if(!product){
            return res.status(404).send({
                msg:'No se encontro el producto'
            })
        }
        // b- se encontro el producto 
        return res.status(200).send({
            msg:'producto encontrado',
            product

        })


    }).catch((error) => {
        console .log (error)
        return res.status(500).send({
            msg:'error al obtener producto'

        })
    })
}



module.exports = {
    getAllProducts,
    deleteProduct,
    addProduct
}