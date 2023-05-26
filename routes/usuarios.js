
const { Router } = require('express');
const { check } = require('express-validator');



const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste } = require('../helpers/db-validators');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch,  } = require('../controllers/usuarios');

const router = Router();




router.get('/', usuariosGet );

router.put('/:id', usuariosPut);


router.post('/',[
    check('nombre', 'el nombre es valido').not().isEmpty(),
    check('password', 'el password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(  esRolValido ),
    validarCampos
], usuariosPost);


 
router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;