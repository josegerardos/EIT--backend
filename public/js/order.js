

let order = []
const tableBody = document.getElementById('table-body');
const totalButton = document.getElementById('total-button');
const totalDisplay = document.getElementById('total-display');

function paintTable(orders) {
  
  if(tableBody !== null) {
    tableBody.innerHTML = "";
    if (orders.length === 0) {
      tableBody.innerHTML = `<tr class="disabled"><td colspan="7">NO SE ENCONTRARON ORDERS</td></tr>`;
      return;
    }

    orders.forEach((order, index) => {
      let imageSrc = order.image ? order.image : '/assets/product-img/img 10 no product.png';
      const tableRow =
        `            
          <tr class="order">
            <td class="product__img">
            <img class="product__img product__img--cell" src="${imageSrc}" alt="${order.name}"></img>
          </td>
            
            
            <td class="order__name">${order.name}</td>
            <td class="order__description">${order.description}</td>
            <td class="order__cantidad">${order.cantidad}</td>
            <td class="order__price">${order.price}</td>
            <td class="order__price">${order.subtotal}</td>
            
            <td class="order__actions">
              <button class="order__actions-btn order__actions-btn--edit" onclick="deleteProduct(${index})">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>
        `;
      tableBody.innerHTML += tableRow;
    });
let total = 0
orders.forEach((order) => {
total += order.subtotal
})
    const totalRow = `
      <tr class="order__total">
        <td colspan="6">Total:</td>
        <td id="total-amount" class="order__total-amount">${total }

    `;
    tableBody.innerHTML += totalRow;

    
  }
}



function getOrders() {
  axios.get('http://localhost:4000/api/orders', {
    headers: {
      Authorization: localStorage.getItem('token') || ''
    }
  })
  .then(response => {
    const order = response.data.orders;
    paintTable(order);
  })
  .catch(error => {
    console.error('Error al obtener los pedidos:', error);
  });
}





paintTable(JSON.parse(localStorage.getItem('cart')))



 async function addToOrder(index) {
  console.log('add to order')
  let response = await axios.get('http://localhost:4000/api/products')
  let products = response.data.productos
  const product = products[index]
  let shoppingCart = JSON.parse(localStorage.getItem('cart'))

  if(!shoppingCart) {

    shoppingCart = []
  }
  let cartIndex = shoppingCart.findIndex(producto =>producto.name === product.name)
  console.log(shoppingCart)
  
  if (cartIndex === -1) {
    product.cantidad = 1;
    product.subtotal = product.price;
    shoppingCart.push(product)
    
  } else {
    shoppingCart[cartIndex].cantidad += 1;
    shoppingCart[cartIndex].subtotal += product.price;
  }
  
  localStorage.setItem('cart', JSON.stringify(shoppingCart));
 document.getElementById('cart-count').textContent = shoppingCart.length
 window.location.href = '/order';
  
  
}




function deleteProduct(index) {
  swal({
        title: "¿Estás seguro?",
        text: "El producto será eliminado de la orden.",
        icon: "warning",
        buttons: ["Cancelar", "Eliminar"],
        dangerMode: true,
      }).then((confirm) => {
        if (confirm) {
          let cart = JSON.parse(localStorage.getItem('cart'))
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  swal({
    title:`Elemento borrado correctamente`,
    icon:'error'
})
  paintTable(cart)
        }
      })
  
}








let btnCreateOrder = document.getElementById('btn-create-order')
if(btnCreateOrder !== null) {
document.getElementById('btn-create-order').addEventListener('click', () => {
  let cart = JSON.parse(localStorage.getItem('cart'))
  let productos = cart.map((producto) => {
return {productId:producto._id,
  quantity: producto.cantidad,
  price: producto.price,
  
}
  })
  let total = 0
  cart.forEach((producto) => {
  total += producto.subtotal
  })
  let data = {
    products:productos,
    userId: '646bd906aae9cb1565ae8924',
    total:total
  }

  axios.post('http://localhost:4000/api/orders', data).then((res) => {
console.log(res)
swal({
  title:`Su orden fue creada con exito`,
  icon:'sucess'
})
localStorage.setItem('cart', JSON.stringify([]))
paintTable([])
  })
})
}




