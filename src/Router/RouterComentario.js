'use strict';

const Database = require('../Database/Query');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: __dirname + '/../img'}) // ./img es para carpeta donde se subira la foto

function endPointComentarios(router){

    //agregar mensaje ruta -> http://localhost:3001/api/addComent
    router.post('/addComent', (req, res) => {
        let coment = 
            {
                id_comentario:'',
                id_foto:req.body.id_foto,
                id_usuario:req.body.id_usuario,
                texto_comentario:req.body.texto_comentario
            };

        Database.addComent(coment, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});
            
            res.status(200).json({success:true, data:data});
        })
    });

    //obtener mensajes por id foto ruta -> http://localhost:3001/api/getComentByIdImagen/:id
    router.get('/getComentByIdImagen/:id', (req, res) => {
        let id = req.params.id;

        Database.getComentByIdImagen(id, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    });
}

module.exports = endPointComentarios;