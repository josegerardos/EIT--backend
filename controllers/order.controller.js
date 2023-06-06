const { responseCreator } = require('../utils/utils');
const Order =require('../schemas/order.schema');

async function createOrder(req, res) {
    try{
    const body = req.body;
    const data = new Order(body);
    const newOrder = await data.save();
    return responseCreator(res, 200, 'Orden creada correctamente', {newOrder});
    } catch (error) {
    console.log(error)
    return responseCreator(res, 500,'Error al crear orden' , )
    }
};



async function getOrders(req, res) {

    try{
    const orders = await Order.find().populate('userId', {fullName:1, email:1}).populate('products.productId',{name: 1, description: 1, image: 1} );
    if(!orders) {
    return responseCreator(res, 404, 'No se encontraron ordenes')
    } 
    return responseCreator(res, 200, 'ordenes obtenidas correctamente', {orders})
    } catch (error) {
    console.log(error)
    return responseCreator(res, 500,'Error al obtener las ordenes' , )
    }

};

async function getOrderById(req, res) {
    try{
    const id = req.params.id; 
    const order = await Order.findById(id).populate('userId', {fullName:1, email:1}).populate('products.productId',{name: 1, description: 1, image: 1} );
    if(!order) {
    return responseCreator(res, 404, 'No se encontraron ordenes');
    }
    return responseCreator(res, 200, 'orden obtenida correctamente', {order});
    } catch (error) {
    console.log(error)
    return responseCreator(res, 500, 'Error al obtener la orden',);
    }

};

async function updateOrder(req, res) {
    try{
    const id = req.query.id;
    const data = req.body;
    const newOrder = await Order.findByIdAndUpdate(id, data, {new:true});
    if(!newOrder){
        return responseCreator(res, 404, 'La orden no se pudo modificar');
    }
    return responseCreator(res, 200, 'orden modificada correctamente', {newOrder});
    } catch (error) {
    console.log(error)
    return responseCreator(res, 500, 'Error al modificar la orden', )
    }
};

async function deleteOrder(req, res) {
    try{
    const id = req.params.id;
    const deleteOrder = await Order.findByIdAndDelete(id);
    if(!deleteOrder) return responseCreator(res, 404, 'No se encontro la orden')
    return responseCreator(res, 200, 'Orden borrada correctamente', {deleteOrder})
    } catch (error) {
    console.log(error)
    return responseCreator(res, 500, 'Error al borrar la orden', )
    }
}

async function getUserOrders(req, res) {
    try{
    const userId = req.params.id;
    const userOrders = await Order.find({ userId: userId }).populate('userId', {fullName:1, email:1}).populate('products.productId',{name: 1, description: 1, image: 1} );
    if(!userOrders) return responseCreator(res, 404, 'no se encontro la orden');
    return responseCreator(res, 200, ` ordenes del usuario ${userOrders[0].userId.fullName}  obtenidas correctamente`, {userOrders});
    } catch (error) {
    console.log(error)
    return responseCreator(res, 500, 'Error al obtener la orden' );
    }
}


module.exports = {
createOrder,
getOrders,
getOrderById,
updateOrder,
deleteOrder,
getUserOrders

}