const { request, response } = require('express');
const bcjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async(req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Correo'
            })
        }

        // Si el usuario está Activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Estado: false'
            })
        }

        // Verificar la contraseña
        const validPassword = bcjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Password'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario._id)


        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login,
}