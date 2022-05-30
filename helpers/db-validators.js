const Role = require('../models/role');
const Usuario = require('../models/usuario');




const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) throw new Error(`El rol ${rol} no está registrado en la BD`);
}


//Verificar si el correo existe
const existeEmail = async(correo = '') => {
    const emailExiste = await Usuario.findOne({ correo });
    if (emailExiste) throw new Error(`El correo ${correo} ya está registrado`);
}

const existeUsuarioPorId = async(id) => {
    const emailUsuario = await Usuario.findById(id);
    if (!emailUsuario) throw new Error(`El id no existe ${id} `);
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
}