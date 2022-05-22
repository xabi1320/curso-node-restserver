const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {

    const query = req.query;

    res.json({
        ok: true,
        msg: 'get API - Controlador',
        query
    });
}

const usuariosPost = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'post API',
        nombre,
        edad
    });
}

const usuariosPut = (req = request, res = response) => {
    const { id } = req.params;

    res.status(400).json({
        ok: true,
        msg: 'put API',
        id
    });
}

const usuariosDelete = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}