'use strict';

const Database = require('../Database/Query');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: __dirname + '/../img'}) // ./img es para carpeta donde se subira la foto

function endPointLike(router){

    //dar like -> http://localhost:3001/api/addLike
    router.post('/addLike', (req, res) => {
        let like = 
            {
                id_megusta:'',
                id_usuario:req.body.id_usuario,
                id_foto:req.body.id_foto
            }

        Database.addLike(like, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});

        })
    });

    //comprobar likeruta -> http://localhost:3001/api/getLikeById/:id/:id2
    router.get('/getLikeById/:id/:id2', (req, res) => {
        let like = 
            {
                id_usuario:req.params.id,
                id_foto:req.params.id2
            }
        console.log(like)
        Database.getLikeById(like, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    })

}

module.exports = endPointLike;