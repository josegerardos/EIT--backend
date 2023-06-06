const productForm = document.getElementById("add-product");
const submitBtn = document.getElementById("submit-btn");
const tableBody = document.getElementById("table-body");
editIndex =[]
let isEditing = false

const URL = 'http://localhost:4000/api';
const URL_public = 'http://localhost:4000';


async function renderTable() {
  try {
    const response = await axios.get('http://localhost:4000/api/products');
    
    const products = response.data.productos;

    tableBody.innerHTML = "";
    if (products.length === 0) {
      tableBody.innerHTML = `<tr class="disabled"><td colspan="6">NO SE ENCONTRARON PRODUCTOS</td></tr>`;
      return;
    }

    products.forEach((producto, index) => {
      
      let id = producto._id;
      // console.log(id)
      let imageSrc = producto.image ? producto.image : '/assets/product-img/img 10 no product.png';
      const tableRow = `  
        <tr class="product">
          <td class="product__img">
            <img class="product__img product__img--cell" src="${imageSrc}" alt="${producto.name}"></img>
          </td>
          <td class="product__name">${producto.name}</td>
          <td class="product__description">${producto.description}</td>
          <td class="product__price">${producto.price}</td>
          <td class="product__actions">
            <button class="product__actions-btn" onclick="editProduct(${index})"><i class="fa-solid fa-pencil"></i></button>
            <button class="product__actions-btn product__actions-btn--edit" onclick="deleteProduct(${index})"><i class="fa-solid fa-trash-can"></i></button>
            <button class="product__actions-btn product__actions-btn--favorite ${producto.favorite ? 'active' : '' }" onclick="setFavoriteProduct(${index})"> <i class="fa-regular fa-star"></i></button>
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



async function addProduct(evt) {
  console.log('isediting', isEditing)
  evt.preventDefault();
  const response = await axios.get('http://localhost:4000/api/products');
    
    const products = response.data.productos;
  const elements = evt.target.elements;
  let form = evt.target;
  let inputs = form.querySelectorAll('input')
  let textarea = form.querySelector('textarea')
  
  let data= {}
  inputs.forEach((input) =>{
data[input.id] = input.value
  })
  data[textarea.id] = textarea.value
  try {
    if (isEditing) {
      await axios.put(`http://localhost:4000/api/products/${products[editIndex]._id}`, data, { 
        headers:{
          Authorization:localStorage.getItem('token')
        }
      });
      isEditing = false;
      swal({
              title:`El producto se editó correctamente`,
              icon:'success'
          })
    } else {
      await axios.post('http://localhost:4000/api/product', data, { 
        headers:{
          Authorization:localStorage.getItem('token')
        }
      });

      swal({
        title:`El producto se agrego correctamente`,
        icon:'success'
    })
    }

    

    editIndex = undefined;
    submitBtn.classList.remove('edit-btn');
    submitBtn.innerText = 'Cargar producto';

    renderTable();
    evt.target.reset();
    elements.name.focus();
  } catch (error) {
    console.error(error);
    swal({
      title:`Error al guardar el producto`,
      icon:'error'
  })
  }
}




async function deleteProduct(index) {
  let {data} = await axios.get('http://localhost:4000/api/products')
  let products = data.productos;
  swal({
          title:`Borrar producto`,
          text:`Esta seguro que desea borrar el producto ${products[index].name}`,
          icon:`warning`,
          buttons:{
              cancel:`Cancelar`,
              delete:`Borrar`
          }
      }).then( async (value) => {
        if(value === 'delete' ) {
          try {
            
            await axios.delete(`http://localhost:4000/api/products/${products[index]._id}`);
            swal({
              title:`Elemento borrado correctamente`,
              icon:'success'
          })
            renderTable();
          } catch (error) {
            console.error(error);
            swal({
              title:`Error al eliminar el producto`,
              icon:'error'
          })
          }
        }
       })

}

 async function editProduct(idx) {
  console.log('editproduct')
  const response = await axios.get('http://localhost:4000/api/products');
    
    const products = response.data.productos;
  submitBtn.classList.add("edit-btn");
  submitBtn.innerText = "Editar producto";

  let prod = products[idx];
  const elementsEdit = productForm.elements;
  elementsEdit.image.value = prod.image;
  elementsEdit.name.value = prod.name;
  elementsEdit.description.value = prod.description;
  elementsEdit.price.value = prod.price;
  editIndex = idx;
  isEditing = true
}


function setFavoriteProduct(index) {
  

  products.forEach((prod, idx) => {
    if (index === idx) {
      prod.favorite = true;
    console.log(prod.favorite)

    } else {
      prod.favorite = false;
    }
    localStorage.setItem("products", JSON.stringify(products));
  });
  renderTable();
}




