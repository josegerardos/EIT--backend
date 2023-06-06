

async function renderTable() {
const tableBody = document.getElementById("table-body");

    try {
      const response = await axios.get('http://localhost:4000/api/orders');
      
      const orders = response.data.orders;
  
      tableBody.innerHTML = "";
      if (orders.length === 0) {
        tableBody.innerHTML = `<tr class="disabled"><td colspan="6">NO SE ENCONTRARON PRODUCTOS</td></tr>`;
        return;
      }
  
      orders.forEach((order, index) => {
        
        
        console.log(order)
       
        const tableRow = `  
          <tr class="product">
            
            <td class="product__name">${order.products.map((product) => product._id+'\n').join()}</td>
            <td class="product__description">${order.userId.fullName}</td>
            <td class="product__price">${order.total}</td>
            <td class="product__price">${order.status}</td>
            <td class="product__actions">
              <button class="product__actions-btn" onclick="editProduct(${index})"><i class="fa-solid fa-pencil"></i></button>
              <button class="product__actions-btn product__actions-btn--edit" onclick="deleteProduct(${index})"><i class="fa-solid fa-trash-can"></i></button>
              <button class="product__actions-btn product__actions-btn--favorite ${order.favorite ? 'active' : '' }" onclick="setFavoriteProduct(${index})"> <i class="fa-regular fa-star"></i></button>
            </td>
          </tr>`;
  
        tableBody.innerHTML += tableRow;
      });
    } catch (error) {
      console.error(error);
      swal({
              title:`Error al obtener los productos`,
              icon:'error'
          })
    }
  }
  renderTable()