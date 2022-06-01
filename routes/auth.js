const { Router } = require('express');
const { check } = require('express-validator');

const { validaCampos } = require('../middlewares');

const { login, googleSignIn } = require('../controllers/auth');


const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La Contraseña es obligatoria').notEmpty(),
    validaCampos
], login);

router.post('/google', [
    check('id_token', 'id_token es necesario').notEmpty(),
    validaCampos
], googleSignIn);



module.exports = router