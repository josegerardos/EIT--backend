const product = require('./../schemas/product.schema')

const getAllProducts = (req, res) => {
    product.find().then(function(productos){
    if(!product) return res.status(404).send({
    msg:'No se encontraron los productos'
    })
    return res.status(200).send({
    msg:'productos obtenidos correctamente',
    productos: productos
    })
}).catch(error => {
    console.log(error);
    return res.status.send('No se pudieron obtener los productos')
    })
};

//todo ==========================================================================================


function addProduct(req, res) {
    // console.log(req.body);
    // console.log(req.file);
    
    const Product = new product(req.body);
    Product.save()
        .then(function(Product) {
            return res.status(200).send({
                msg: 'Producto guardado correctamente',
                Product
            });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send('El producto no se pudo guardar');
        });
}



//todo ==================================================================================================

function deleteProduct(req, res){
    const id = req.params.id
    console.log(id)
    product.findByIdAndDelete(id).then((deleted) => {
    if(!deleted){
    return res.status(404).send({
    msg:'No se pudo borrar el producto',
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
    });
    });
};

// todo================================================================================================

function getProduct(req,res){
    const id = req.params.id;
    if(!id){
    return res.status(400).send({
    msg:'Es necesario que mande un id'
    });
    };
    product.findById(id).then((product) => {
    // dos casos posibles si se hace bien la peticion :
    // a-el id proporcionado no corresponde a ningun producto :
    if(!product){
    return res.status(404).send({
    msg:'No se encontro el producto'
    });
    };
    // b- se encontro el producto 
    return res.status(200).send({
    msg:'producto encontrado',
    product
    });
    }).catch((error) => {
    console .log (error);
    return res.status(500).send({
    msg:'error al obtener producto'
    });
    });
};
//todo ====================================================================================

async function updateProduct(req, res) {
    try{
    const id = req.params.id;
    const data = req.body;
    const newProduct = await product.findByIdAndUpdate(id, data, {new:true});
    if(!newProduct){
    return res.status(404).send({
    msg:`El producto no se actualizo`
    })
    }
    return res.status(200).send({
    msg:`Producto actualizado correctamente`,
    newProduct:newProduct    
    });
    } catch (error) {
    console.log(error);
    return res.status(500).send({
    msg:' No se pudo actualizar el producto'
    });
    };
};

module.exports = {
    getAllProducts,
    deleteProduct,
    addProduct,
    getProduct,
    updateProduct
}