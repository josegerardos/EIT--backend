
const token = localStorage.getItem('token')
let orders = []
const response = axios.get('https://ecommerce-noqj.onrender.com/api/orders', {
  headers:{
    Authorization: token
  }
}).then((response) => {
   orders = response.data.orders;
renderTable()
})
      

async function renderTable() {
const tableBody = document.getElementById("table-body");

    try {
      
  
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
              <button class="product__actions-btn" onclick="editOrder(${index})"><i class="fa-solid fa-pencil"></i></button>
              <button class="product__actions-btn product__actions-btn--edit" onclick="deleteProduct(${index})"><i class="fa-solid fa-trash-can"></i></button>
              
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


async function editOrder(index) {
  selectedOrder = orders[index]
  let editForm = document.getElementById('editOrder')
  console.log(selectedOrder)
editForm.innerHTML = `<select id ='status-change'>
<option>onhold</option>
<option>inprogress</option>
<option>done</option>
</select>
<button id = 'edit-button'>editar</button>
`
let editButton = document.getElementById('edit-button')
let statusChange = document.getElementById('status-change')
editButton.addEventListener('click',async (event) => {
  event.preventDefault()
  let options = ['onhold', 'inprogress', 'done']
  let data = {
    status:options[statusChange.selectedIndex]
  }
  await axios.put('https://ecommerce-noqj.onrender.com/api/orders/'+selectedOrder._id, data, {
    headers:{
      Authorization: token
    }
  } )

  let respuesta = await axios('https://ecommerce-noqj.onrender.com/api/orders', {
    headers:{
      Authorization: token
    }
  }) 
 orders = respuesta.data.orders
renderTable()
})
}



