const User = require('../schemas/user.schema');
const secret = process.env.JWT_SECRET;
const {responseCreator} = require('../utils/utils');
const bcrypt = require('bcrypt');
const salRounds = 10;
const jwt = require('jsonwebtoken');

async function postUser(req, res) {
try{
    // console.log(req.body);
    const user = new User(req.body);
    user.role = "CLIENT_ROLE";
    console.log('user', user)
    // codificacion de password con bcrypt:
    const passwordHash = await bcrypt.hash(user.password, salRounds);
    user.password = passwordHash;  


    const newUser = await user.save();
    // console.log(user)
    return res.status(201).send({
    msg:`Usuario creado correctamente`,
    user: newUser
    });
}catch (error) {
    console.log(error);
    return res.status(500).send({
    msg:`Error al crear usuario`
});
}
};

// todo======================================================================

const login = async (req, res) => {
    try{
    console.log(req.body)
    const emailLogin = req.body.email;
    const passwordLogin = req.body.password;
    if(!emailLogin || !passwordLogin){
    return res.status(400).send({
    msg:`Datos del login incompletos `
    })
    }
    const user = await User.findOne({
    email:emailLogin
    }) 
    if(!user){return res.status(404).send({
    msg:`Datos de ingreso incorrectos`
    })
    }
    // comprobación de password del usuario:
    const result = await bcrypt.compare(passwordLogin, user.password);
    if(!result){
    return res.status(404).send({
    msg:`Datos de ingreso incorrectos `
    })
    }
    user.password = undefined;
    // token :
    const token = jwt.sign(user.toJSON(), secret);

    return res.status(200).send({
    msg:`Login correcto`,
    user,
    token
    })
    }catch (error){
    console.log(error);
    return res.status(500).send(`No se pudo realizar el login`)
    };
}; 

// todo======================================================================

async function getUser(req, res) {
    const id = req.params.id;
    if(req.user.role !== 'ADMIN_ROLE' && req.user._id !== id) {
    return responseCreator(res, 401, 'No puede obtener este usuario');
    }
    try{
    const user = await User.findById(id);
    if(!user) return responseCreator(res, 404, 'No se encontro el usuario');
    user.password = undefined;
    return responseCreator(res, 200, 'Usuario encontrado', {user});
    }catch(error){
    console.log(error);
    return responseCreator(res, 500, 'No se pudo obtener el usuario');
    }    
}

// todo======================================================================

async function getAllUsers(req, res) {
    try {
    const users = await User.find();
    if(!users) {
    return responseCreator(res, 404, 'No se encontraron usuarios')
    }
    return responseCreator(res, 200, 'Usuarios obtenidos correctamente', {users: users});
    } catch (error) {
    console.log(error);
    return responseCreator(res, 500, 'Error al obtener usuarios')
    }
};

// todo======================================================================

async function deleteUser(req, res) {
    try {
    const id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    if(!deleteUser) return responseCreator(res, 404, 'No se encontró el usuario');
    return responseCreator(res, 200 , 'Usuario borrado correctamente', { deleteUser })
    }catch (error) {
    console.log(error);
    return responseCreator(res, 500, 'Error No se pudo hacer el borrado del usuario');

    };
}

// todo======================================================================

async function updateUser(req, res) {

    try{
    const id = req.params.id;
    console.log('req.user', req.user)
    if(id !== req.user._id && req.user.role !== 'ADMIN_ROLE'){
    return responseCreator(res, 401, 'No puede modificar este usuario');
    }


    const data = req.body;
    data.password = undefined;
    const updateUser = await User.findByIdAndUpdate(id, data, {new:true});
    if(!updateUser)return responseCreator(res, 404, 'No se pudo actualizar usuario');
    return responseCreator(res, 200, 'usuario actualizado correctamente', {updateUser});
    } catch (error) {
    console.log(error)
    return responseCreator(res, 500, 'Error al actualizar el usuario' )
    }
}

// todo=======================================================================
async function updatePassword(req, res) {
    try{
    const id = req.params.id;
    const oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword; 
    const user = await User.findById(id);
    if(!user) return responseCreator(res, 404, 'No se encontro el usuario');
    const pwdCompare = await bcrypt.compare(oldPassword, user.password);
    if(!pwdCompare) return responseCreator(res, 401, 'No se pudo modificar el password');
    newPassword = await bcrypt.hash(newPassword, salRounds); 
    await User.findOneAndUpdate(id, {password:newPassword} );
    return responseCreator(res, 200, 'Password actualizado correctamente');
    } catch (error) {
    console.log(error);
    return responseCreator(res, 500, 'error al actualizar password');
    }
}

module.exports = {
    postUser,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser,
    login,
    updatePassword
}