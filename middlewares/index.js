const validaCampos = require('../middlewares/valida-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
}