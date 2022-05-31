const { Router } = require('express');
const { check } = require('express-validator');

const { validaCampos } = require('../middlewares/valida-campos');

const { login } = require('../controllers/auth');


const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La Contraseña es obligatoria').notEmpty(),
    validaCampos
], login);



module.exports = router