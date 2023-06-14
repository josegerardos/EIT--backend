

const loginForm = document.getElementById('loginForm');
const URL = 'https://ecommerce-noqj.onrender.com/api';

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const dataBody = {
      email: loginForm.elements.email.value,
      password: loginForm.elements.password.value
    };

    const resp = await axios.post(`${URL}/login`, dataBody, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });

    console.log(resp);

    const { token, user } = resp.data;

    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));

    swal({
      title: 'Login correcto, te redireccionaremos en unos instantes...',
      icon: 'success'
    });

    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  } catch (error) {
    console.log(error);
    swal({
      title: 'Error al hacer login',
      icon: 'error'
    });
  }
});
