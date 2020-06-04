const Database = require('../Database/Query');
// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart({uploadDir: __dirname + '/../img'}) // ./img es para carpeta donde se subira la foto

function endPointFollow(router){

    //ingresar follow ruta -> http://localhost:3001/api/addFollow
    router.post('/addFollow', (req, res) => {
        let follow = 
            {
                id_seguir:'',
                id_usuario_seguido:req.body.id_usuario_seguido,
                id_usuario_seguidor:req.body.id_usuario_seguidor
            };
        
        Database.addFollow(follow, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    });

    //dejar el follow ruta -> http://localhost:3001/api/deleteFollow
    router.delete('/deleteFollow', (req, res) => {
        let follow = 
            {
                id_usuario_seguido:req.body.id_usuario_seguido,
                id_usuario_seguidor:req.body.id_usuario_seguidor
            };

        Database.deleteFollow(follow, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    });

    //comprobar follow ruta -> http://localhost:3001/api/checkFollow
    router.get('/checkFollow/:id/:id2', (req, res) => {
        let follow = 
            {
                id_usuario_seguido:req.params.id,
                id_usuario_seguidor:req.params.id2
            }

        Database.checkFollow(follow, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    });

    //comprobar follow por ide de usuario registrado ruta -> http://localhost:3001/api/addFollowByIdUser/:id
    router.get('/addFollowByIdUser/:id', (req, res) => {
        let id = req. params.id;

        Database.addFollowByIdUser(id, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    })
    

};

module.exports = endPointFollow;