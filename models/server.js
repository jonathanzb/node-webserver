const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a la base de datos 
        this.conectarDB();

        //middlewares ( son funciones que añaden funcionalidades al server)
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes()
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //Parseo y lectuta del body(JSON)
        this.app.use( express.json() );

        //Director publico
        this.app.use( express.static('public') );
    }

    routes() {
        
        this.app.use( this.usuariosPath, require('../routes/usuarios'));

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}


module.exports = Server;