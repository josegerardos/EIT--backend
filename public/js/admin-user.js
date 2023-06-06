// const userForm = document.getElementById('add-user');

// const submitBtnUser = document.getElementById('submit-btnUser');

// const tableBodyUser = document.getElementById('table-bodyUser')

// let editIndex;

// function renderTableUser() {
// tableBodyUser.innerHTML = "";

// if(usuarios.length === 0) {
//     tableBodyUser.innerHTML = `<tr class = "disabled"><td colspan="6"></td>NO SE ENCONTRARON PRODUCTOS</td></tr>`
//     return
// }

// usuarios.forEach((users, index) => {

// const tableUser = ` <tr class="user">
//                     <td class="user__fullname">${users.fullname}</td>
//                     <td class="user__email">${users.email}</td>
//                     <td class="user__role">${users.role}</td>
//                     <td class ="user__actions">
//                     <button class = "user__actions-btn" onclick="editUser(${index})"><i class="fa-solid fa-pencil"></i></button>
//                     <button class = "user__actions-btn user__actions-btn--edit" onclick="deleteUser(${index})"><i class="fa-solid fa-trash-can"></i></button>
//                     </td>
//                     </tr>  `
// tableBodyUser.innerHTML += tableUser;
// })
// }
// renderTableUser()

// function addUser(evt) {
//     evt.preventDefault();
//     const elements = evt.target.elements;
//     const newUser = new FormData(evt.target);
//     const newUserData = Object.fromEntries(newUser);
//     if(editIndex >= 0){
//         usuarios[editIndex] = newUserData;
//         swal({
//             title:`El usuario se edito correctamente`,
//             icon:'info'
//         })
//     } else {
//         usuarios.push(newUserData);
//         swal({
//             title:`El usuario se agrego correctamente`,
//             icon:'success'
//         })
//     }

// localStorage.setItem('users', JSON.stringify(usuarios));
// editIndex = undefined;
// submitBtnUser.classList.remove('edit-btn');
// submitBtnUser.innerText = 'Cargar usuario';

// renderTableUser()
// evt.target.reset();
// elements.name.focus();
// }

// function deleteUser(indice) {

// swal({
//         title:`Borrar usuario`,
//         text:`Esta seguro que desea borrar el usuario ${usuarios[indice].name}`,
//         icon:`warning`,
//         buttons:{
//         cancel:`Cancelar`,
//         delete:`Borrar`
//         }
// }).then(value=>{
//     if(value === `delete`){
//     usuarios.splice(indice,1)
    
    
//     usuarios.splice(indice, 1)
//     localStorage.setItem('users', JSON.stringify(usuarios))
//     swal({
//         title:`Usuario borrado correctamente`,
//         icon:'error'
//     })
//     renderTableUser()
//     } else {
//     return
//     }
//     })
// }

// function editUser(idx) {
//     submitBtnUser.classList.add('edit-btn');
//     submitBtnUser.innerText = 'Editar usuario'
    
//     let u = usuarios[idx];
//     const elementsEdit = userForm.elements;
//     elementsEdit.fullname.value = u.fullname;
//     elementsEdit.email.value = u.email;
//     elementsEdit.role.value = u.role;
//     editIndex = idx;
// }


// let users = [];
// const URL = `http://localhost:4000/api`;

// async function addUser() {
// try {
// const token = localStorage.getItem('token');
// const response = await axios.get(`${URL}/users`, {
// headers:{ 
// Authorization: token
//  }      
//  });
// console.log(response)

// todo============================================================================

// const userForm = document.getElementById('add-user');

// const submitBtnUser = document.getElementById('submit-btnUser');

// const tableBodyUser = document.getElementById('table-bodyUser')

// let editIndex;

// function renderTableUser() {
// tableBodyUser.innerHTML = "";

// if(users.length === 0) {
//     tableBodyUser.innerHTML = `<tr class = "disabled"><td colspan="6"></td>NO SE ENCONTRARON PRODUCTOS</td></tr>`
//     return
// }

// users.forEach((users, index) => {

// const tableUser = ` <tr class="user">
//                     <td class="user__fullname">${users.fullname}</td>
//                     <td class="user__email">${users.email}</td>
//                     <td class="user__role">${users.role}</td>
//                     <td class ="user__actions">
//                     <button class = "user__actions-btn" onclick="editUser(${index})"><i class="fa-solid fa-pencil"></i></button>
//                     <button class = "user__actions-btn user__actions-btn--edit" onclick="deleteUser(${index})"><i class="fa-solid fa-trash-can"></i></button>
//                     </td>
//                     </tr>  `
// tableBodyUser.innerHTML += tableUser;
// })
// }
// renderTableUser()

// function addUser(evt) {
//     evt.preventDefault();
//     const elements = evt.target.elements;
//     const newUser = new FormData(evt.target);
//     const newUserData = Object.fromEntries(newUser);
//     if(editIndex >= 0){
//         users[editIndex] = newUserData;
//         swal({
//             title:`El usuario se edito correctamente`,
//             icon:'info'
//         })
//     } else {
//         users.push(newUserData);
//         swal({
//             title:`El usuario se agrego correctamente`,
//             icon:'success'
//         })
//     }

// // localStorage.setItem('users', JSON.stringify(usuarios));
// editIndex = undefined;
// submitBtnUser.classList.remove('edit-btn');
// submitBtnUser.innerText = 'Cargar usuario';

// renderTableUser()
// evt.target.reset();
// elements.name.focus();
// }

// function deleteUser(indice) {

// swal({
//         title:`Borrar usuario`,
//         text:`Esta seguro que desea borrar el usuario ${usuarios[indice].name}`,
//         icon:`warning`,
//         buttons:{
//         cancel:`Cancelar`,
//         delete:`Borrar`
//         }
// }).then(value=>{
//     if(value === `delete`){
//     users.splice(indice,1)
    
    
//     users.splice(indice, 1)
//     // localStorage.setItem('users', JSON.stringify(usuarios))
//     swal({
//         title:`Usuario borrado correctamente`,
//         icon:'error'
//     })
//     renderTableUser()
//     } else {
//     return
//     }
//     })
// }

// function editUser(idx) {
//     submitBtnUser.classList.add('edit-btn');
//     submitBtnUser.innerText = 'Editar usuario'
    
//     let u = users[idx];
//     const elementsEdit = userForm.elements;
//     elementsEdit.fullname.value = u.fullname;
//     elementsEdit.email.value = u.email;
//     elementsEdit.role.value = u.role;
//     editIndex = idx;
// }

// //todo ==================================================================================
// } catch (error) {
// console.log(error);
// }
// }
// addUser();




const userForm = document.getElementById('add-user');

const submitBtnUser = document.getElementById('submit-btnUser');

const tableBodyUser = document.getElementById('table-bodyUser')

let users = [];
let editIndex;

const URL = `http://localhost:4000/api`;

async function getUsers() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URL}/admin-user`, {
      headers: {
        Authorization: token
      }
    });
    console.log(response);

    // Lógica adicional para procesar los datos de los usuarios y actualizar la tabla
    users = response.data.users; // Asigna los usuarios obtenidos de la respuesta al arreglo 'users'
    renderTableUser();
  } catch (error) {
    console.log(error);
  }
}

function renderTableUser() {
  const tableBodyUser = document.getElementById('table-bodyUser');

  tableBodyUser.innerHTML = "";

  if (users.length === 0) {
    tableBodyUser.innerHTML = `<tr class="disabled"><td colspan="6">NO SE ENCONTRARON PRODUCTOS</td></tr>`;
    return;
  }

  users.forEach((user, index) => {
    const tableUser = `<tr class="user">
                        <td class="user__fullname">${user.fullName}</td>
                        <td class="user__email">${user.email}</td>
                        <td class="user__role">${user.role}</td>
                        <td class="user__actions">
                        <button class="user__actions-btn" onclick="editUser(${index})"><i class="fa-solid fa-pencil"></i></button>
                        <button class="user__actions-btn user__actions-btn--edit" onclick="deleteUser(${index})"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                        </tr>`;
    tableBodyUser.innerHTML += tableUser;
  });
}

function addUser(evt) {
  evt.preventDefault();
  const elements = evt.target.elements;
  const newUser = new FormData(evt.target);
  const newUserData = Object.fromEntries(newUser);

  if (editIndex >= 0) {
    users[editIndex] = newUserData;
    swal({
      title: 'El usuario se editó correctamente',
      icon: 'info'
    });
  } else {
    users.push(newUserData);
    swal({
      title: 'El usuario se agregó correctamente',
      icon: 'success'
    });
  }

  renderTableUser();
  evt.target.reset();
  elements.name.focus();
}

function deleteUser(index) {
  swal({
    title: 'Borrar usuario',
    text: `¿Está seguro de que desea borrar el usuario ${users[index].name}?`,
    icon: 'warning',
    buttons: {
      cancel: 'Cancelar',
      delete: 'Borrar'
    }
  }).then(value => {
    if (value === 'delete') {
      users.splice(index, 1);
      swal({
        title: 'Usuario borrado correctamente',
        icon: 'error'
      });
      renderTableUser();
    }
  });
}

function editUser(index) {
  const userForm = document.getElementById('add-user');
  const submitBtnUser = document.getElementById('submit-btnUser');
  const elementsEdit = userForm.elements;

  submitBtnUser.classList.add('edit-btn');
  submitBtnUser.innerText = 'Editar usuario';

  let user = users[index];

  elementsEdit.fullName.value = user.fullName;
  elementsEdit.email.value = user.email;
  elementsEdit.role.value = user.role;

  editIndex = index;
}

getUsers();



