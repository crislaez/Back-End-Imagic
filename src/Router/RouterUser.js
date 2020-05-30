'use strict';

const Database = require('../Database/Query');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './img'}) // ./img es para carpeta donde se subira la foto

function endPointUser(router){

    //todos los usuarios ruta -> http://localhost:3001/api/getAllUser
    router.get('/getAllUser', (req, res) => {
        Database.getAllUser( (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    })

    //agregar usuario  ruta -> http://localhost:3001/api/addUser
    router.post('/addUser',multipartMiddleware,(req, res) => {
        let aux = req.files.avatar.path.split('\\');
        let user = 
            {
                id_usuario:'',
                nombre_completo:req.body.nombre_completo,
                nacimiento:req.body.nacimiento,
                nombre_usuario:req.body.nombre_usuario,
                correo:req.body.correo,
                clave:req.body.clave,
                avatar:'ttp://localhost:3001/img/'+aux[1]
            };
        
        Database.addUser(user, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    })
}

module.exports = endPointUser;