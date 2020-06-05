'use strcit';

const Database = require('../Database/Query');

function endPointChat(router){

    //ingresar chat ruta -> http://localhost:3001/api/addChat
    router.post('/addChat', (req, res) => {
        let chat = 
            {
                id_chat:'',
                id_usuario_uno:req.body.id_usuario_uno,
                id_usuario_dos:req.body.id_usuario_dos,
                mensaje:req.body.mensaje
            }

        Database.addChat(chat, (err, data) => {
            if(err) return res.status(500).json({messaje:`error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje:`error al ingresar el mensaje`});

            res.status(200).json({success:true, data:data});
        })
    });

    //todos los mensajes de 2 usuarios ruta -> http://localhost:3001/api/getChatByUsers/:id/:id2
    router.get('/getChatByUsers/:id/:id2', (req, res) => {
        let chat = 
            {
                id_usuario_uno:req.params.id,
                id_usuario_dos:req.params.id2,
            }

        Database.getChatByUsers(chat, (err, data) => {
            if(err) return res.status(500).json({messaje:`error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje:`error al ingresar el mensaje`});

            res.status(200).json({success:true, data:data});
        })
    });

}

module.exports = endPointChat;