const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJTW, esAdminRole } = require('../middlewares');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');



const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerProductos);

// Obtener una categoria por id - publico
router.get('/:id', [
   check('id', 'No es un id de mongo valido').isMongoId(), 
   check( 'id' ).custom( existeProductoPorId ),
   validarCampos,
], obtenerProducto);

// Crear categoria - privado - cualquier persona con un token valido 
router.post('/',[
     validarJTW,
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('categoria', 'No es un id de mongo').isMongoId(),
     check('categoria').custom(existeCategoriaPorId),
     validarCampos
], crearProducto);


// actualizar un registro por id
router.put('/:id',[
    validarJTW,
    // check('categoria', 'No es un id de mongo').not().isMongoId(),
    check( 'id' ).custom( existeProductoPorId ),
    validarCampos
], actualizarProducto);


// Borrar una categoria - Admin
router.delete('/:id', [
    validarJTW,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check( 'id' ).custom( existeProductoPorId ),
    validarCampos 
], borrarProducto);





module.exports = router;