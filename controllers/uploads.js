const { response } = require("express")


const cargarArchivo = (req, res = response) => {

    console.log(req.files);

    res.json({
        msg: 'Cargando archivo...'
    })

}


module.exports = {
    cargarArchivo 
}