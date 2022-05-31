const { Router } = require('express');
const { check } = require('express-validator');


const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user');

const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const { validaCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un mongo ID').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validaCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password debe tener al menos 6 digitos').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validaCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un mongo ID').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validaCampos
], usuariosDelete);

//Para exportar funciones de Router no se puede enviar como objeto
module.exports = router;