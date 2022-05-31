const bcjs = require('bcryptjs');
const { request, response } = require('express');

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
        Usuario.countDocuments(query)
    ])

    res.json({
        ok: true,
        total,
        usuarios
    });
}

const usuariosPost = async(req = request, res = response) => {

    // const { nombre, edad } = req.body;
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcjs.genSaltSync();
    usuario.password = bcjs.hashSync(password, salt);

    //Guardar DB
    await usuario.save();

    res.status(201).json({
        ok: true,
        usuario
    });
}

const usuariosPut = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body

    //TODO validar contra DB
    if (password) {
        //Encriptar la contraseña
        const salt = bcjs.genSaltSync();
        resto.password = bcjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.status(200).json({
        ok: true,
        usuario
    });
}

const usuariosDelete = async(req = request, res = response) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        ok: true,
        usuario,
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}