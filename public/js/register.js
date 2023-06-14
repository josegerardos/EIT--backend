

const registerForm = document.querySelector('#registerForm'); 
    const registerBtn = document.getElementById('registerSubmit');
    registerForm.addEventListener('submit', async (event) => {
    console.log(event);
    event.preventDefault();
    const el = event.target.elements;

    if(el.password.value !== el.password2.value){
        swal({
            title:`El password no coincide`,
            icon:'error'
        })
    return
    }

    const response = await axios.get('http://localhost:4000/api/admin-user')
    let users = response.data.users
    console.log('users', users)
    const userExist = checkIfUserExist(users, el.email.value);
    if(userExist) {
        swal({
            title:`El mail ya se encuentra registrado`,
            icon:'error'
        })
        
        return;
    }


    const user = {
        fullName:el.fullname.value,
        email:el.email.value,
        password:el.password.value,
        password2:el.password2.value,
        age:el.age.valueAsNumber,
        date:el.date.value,
        country:el.country.value,
        sex:el.sex.value,
        termsAndConditions:el.terms.value,
        role:'USER_ROLE'
    }
    // users.push(user)
    // localStorage.setItem('users', JSON.stringify(users));
    await axios.post('https://ecommerce-noqj.onrender.com/api/users', user)
    
    
    
    swal({
        title:`El usuario se registro correctamente`,
        icon:'success'
    })
    window.location.href ='/login';
    });

function checkIfUserExist(users, emailToSearch) {

const indexOfUser = users.findIndex(usuario => {
if(usuario.email === emailToSearch) {
return true
}
})
if(indexOfUser >= 0){
    swal({
        title:`El usuario ya existe`,
        icon:'error'
    })
    
return true;
}
}