


const userForm = document.getElementById('add-user');
const submitBtnUser = document.getElementById('submit-btnUser');
const tableBodyUser = document.getElementById('table-bodyUser');
let users = [];
let editIndex;
let isEditing = false
const URL = 'https://ecommerce-noqj.onrender.com/api';
const URL_public = 'https://ecommerce-noqj.onrender.com';
const token = localStorage.getItem('token');

async function getUsers() {
  try {
    const response = await axios.get(`${URL}/admin-user`, {
      headers: {
        Authorization: token
      }
    });
    users = response.data.users;
    renderTableUser();
  } catch (error) {
    console.log(error);
  }
}

function renderTableUser() {
  console.log(users)
  tableBodyUser.innerHTML = "";

  if (users.length === 0) {
    tableBodyUser.innerHTML = `<tr class="disabled"><td colspan="6">NO SE ENCONTRARON USUARIOS</td></tr>`;
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

async function addUser(evt) {
  evt.preventDefault();
  const elements = evt.target.elements;
  const newUserData = {
    fullName: elements.fullName.value,
    email: elements.email.value,
    role: elements.role.value,
    password: elements.password.value
  };

  try {
    
    const token = localStorage.getItem('token');
    let userid = users[editIndex]
     await axios[isEditing ? 'put' : 'post'](`${URL}/users${isEditing ? '/'+userid._id:''}`,

    newUserData, {
      headers: {
        Authorization: token
      }
    });

    let res = await axios(`${URL}/admin-user`, {
      headers:{
        Authorization:token
      }
    })
users = res.data .users
    swal({
      title: 'El usuario se agregó correctamente',
      icon: 'success'
    });
isEditing = false;
    renderTableUser();
    evt.target.reset();
    elements.fullName.focus();
  } catch (error) {
    console.error(error);
    swal({
      title: 'Error al guardar el usuario',
      icon: 'error'
    });
  }
}

async function deleteUser(index) {
  swal({
    title: 'Borrar usuario',
    text: `¿Está seguro de que desea borrar el usuario ${users[index].fullName}?`,
    icon: 'warning',
    buttons: {
      cancel: 'Cancelar',
      delete: 'Borrar'
    }
  }).then(async (value) => {
    if (value === 'delete') {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${URL}/users/${users[index]._id}`, {
          headers: {
            Authorization: token
          }
        });

        users.splice(index, 1);
        swal({
          title: 'Usuario borrado correctamente',
          icon: 'success'
        });
        renderTableUser();
      } catch (error) {
        console.error(error);
        swal({
          title: 'Error al eliminar el usuario',
          icon: 'error'
        });
      }
    }
  });
}

async function editUser(index) {
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
  isEditing = true;
}

getUsers();

userForm.addEventListener('submit', addUser);
