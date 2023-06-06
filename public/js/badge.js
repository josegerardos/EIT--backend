let badgeHTML = document.getElementById('cart-count');
let cartShoping = JSON.parse(localStorage.getItem('cart'))
function actualizarBadge() {
  badgeHTML.textContent = cartShoping ? cartShoping.length : 0
} 
actualizarBadge()