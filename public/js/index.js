

const cardCcontainer = document.querySelector('#card-container');
const searchBtn = document.querySelector('.product-search__btn');
searchBtn.addEventListener('click', filterProducts);
let productos = [];

function renderProducts(products, ) {
    console.log('renderproduct')
cardCcontainer.innerHTML = '';    
products.forEach((product, index) => {
let id = product._id
console.log(id)
const card = document.createElement('article');
card.classList.add('card');
card.innerHTML = `  <div class="card__header">
                    <img src="${product.image}" alt="${product.name}" class="card__img">
                    </div>
                    <div class="card__body">
                    <div class="card__title">
                    ${product.name}
                    </div>
                    <p class="card__description">
                    ${product.description}
                    </p>
                    <div class="card__price">
                    $ ${product.price}
                    </div>
                    <div class="card__date">
                    13/12/2022
                    </div>
                    </div>
                    <div class="card__footer">
                    <div class="card__btn-buy-container">
                    <button class="card__btn-buy" id="cart-count"  onclick="addToOrder(${index})">Comprar</button>
                    </div>
                    <div class="card__btn-container">
                    <a class='card__btn' href="/product-detail?id=${index}" >Detalle</a>
                    </div>
                    </div>  `
cardCcontainer.appendChild(card);
});

}







function addToCart(product) {
    
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
   window.location.href = '/order';
   const productsCount = document.querySelector('#cantidad-de-productos');
   if(productsCount && document.getElementById('cart-count')){
   document.getElementById('cart-count').textContent = shoppingCart.length

    productsCount.textContent = filteredProducts.length;
   }
  
}


function filterProducts() {
  const searchInput = document.querySelector('#buscar');
  const searchText = searchInput.value.toLowerCase().trim();

  const filteredProducts = productos.filter((product) => {
    const productName = product.name.toLowerCase();
    return productName.includes(searchText);
  });

  renderProducts(filteredProducts);

  const buyButtons = document.querySelectorAll('.card__btn-buy'); // Cambiar la clase de los botones
  buyButtons.forEach((button, index) => {
    button.onclick = () => {
        const product = filteredProducts[index]    
addToCart(product)
    }
  });

  
}





axios.get('http://localhost:4000/api/products').then((res) => {
productos = res.data.productos
renderProducts(res.data.productos)
})




