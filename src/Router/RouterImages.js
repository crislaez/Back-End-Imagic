'use streict';

const Database = require('../Database/Query');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: __dirname + '/../img'}) // ./img es para carpeta donde se subira la foto

function endPointImages(router){

    //ingresar foto ruta -> http://localhost:3001/api/addImagen
    router.post('/addImagen',multipartMiddleware, (req, res) => {

        let aux = req.files.foto.path.split('\\');        
        let imagen = 
            {
               id_usuario:req.body.id_usuario,
               id_foto:'',
               foto:'http://localhost:3001/img/'+aux[8],
               texto_foto:req.body.texto_foto
            }

        Database.addImagen(imagen, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    });

    //imagenes por usuario ruta -> http://localhost:3001/api/getImagenesById/:id
    router.get('/getImagenesById/:id', (req, res) => {
        let id = req.params.id;

        Database.getImagenesById(id, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    });

    //todas las imagenes ruta -> http://localhost:3001/api/getAllImagenes
    router.get('/getAllImagenes', (req, res) => {
        Database.getAllImagenes((err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    });

    //una imagen por ide imagen ruta -> http://localhost:3001/api/getimagenByIdImagen/:id
    router.get('/getImagenByIdImagen/:id', (req, res) => {
        let id = req.params.id;

        Database.getImagenByIdImagen(id, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    })
}

module.exports = endPointImages;