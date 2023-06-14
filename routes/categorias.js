const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJTW, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');



const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id', [
   check('id', 'No es un id de mongo valido').isMongoId(), 
   check( 'id' ).custom( existeCategoriaPorId ),
   validarCampos,
], obtenerCategoria);

// Crear categoria - privado - cualquier persona con un token valido 
router.post('/',[
     validarJTW,
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     validarCampos
     ], crearCategoria);


// actualizar un registro por id
router.put('/:id',[
    validarJTW,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'id' ).custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria);


// Borrar una categoria - Admin
router.delete('/:id', [
    validarJTW,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check( 'id' ).custom( existeCategoriaPorId ),
    validarCampos 
], borrarCategoria);





module.exports = router;