const { response, request, json } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validarCampos } = require('../middlewares/validar-campos');




const usuariosGet = (req= request , res = response) => {

    const {q, nombre, apikey } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}


const usuariosPost = async(req, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )

    //Guardar enDB
    await usuario.save();

    res.json({
       usuario
    });
}


const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const { password, google, correo, ...resto} = req.body;

    //Todo validar contra la base de datos
    if ( password ) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json({
        msg: 'put API - controlador',
        id,
        usuario
    });
}


const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch API - controlador'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}