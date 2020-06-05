'use strict';

//requerimos dotenv
require('dotenv').config();

const express = require('express');

//endpoints
const endPointUser = require('./Router/RouterUser');
const endPointImages = require('./Router/RouterImages');
const endPointComentarios = require('./Router/RouterComentario');
const endPointFollow = require('./Router/RouterFollow');
const endPointLike = require('./Router/RouterLike');
const endPointChat = require('./Router/RouterChat');

const app = express();
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//para la carpeta donde subiremos las imagenes
app.use('/img', express.static(__dirname + '/img', {
    maxAge: '12h'
}))

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  //el * se cambiara y se pondra la url permitida
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const router = express.Router();

app.use('/api',router);

//llamamos a la funcion donde estan todos los endpoin de los usuarios
endPointUser(router);
endPointImages(router);
endPointComentarios(router);
endPointFollow(router);
endPointLike(router);
endPointChat(router);

app.listen(process.env.PORT, () => {
    console.log(`Api Rest corriendo en ${process.env.PORT}`);
})