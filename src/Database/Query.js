'use strict';

const conexion = require('./Conexion');

//obtener todos los usuarios
const getAllUser = (callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios`,(err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//agregar usuarios
const addUser = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO usuarios SET ?`, user, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//login
const login = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE correo = ${conexion.escape(user.correo)} AND clave = ${conexion.escape(user.clave)}`,(err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//buscar usuario por ide
const getUserById = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE id_usuario = ${conexion.escape(id)}`, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
} 

//ingresar imagen
const addImagen = (imagen, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query('INSERT INTO fotos SET ?',imagen, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res)
            }
        })
    }
    // conexion.end();
}

//imagenes por usuario
const getImagenesById = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM fotos INNER JOIN usuarios ON fotos.id_usuario = usuarios.id_usuario WHERE fotos.id_usuario = ${conexion.escape(id)}`, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//obtener todas las imagenes
const getAllImagenes = (callback) => {
    // conexion.changeUser();
    if(conexion){
        conexion.query(`SELECT * FROM fotos INNER JOIN usuarios ON fotos.id_usuario = usuarios.id_usuario`, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//obtener foto por ide
const getImagenByIdImagen = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM fotos WHERE id_foto = ${conexion.escape(id)}`, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//agregar comentarios
const addComent = (coment, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO comentarios SET ?`,coment, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//todos los comentarios por id comentario
const getComentByIdImagen = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM comentarios INNER JOIN fotos ON comentarios.id_foto = fotos.id_foto INNER JOIN usuarios ON comentarios.id_usuario = usuarios.id_usuario WHERE comentarios.id_foto = ${conexion.escape(id)}`,(err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
};

const getUserByUserName = (nombre, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE nombre_usuario = ${conexion.escape(nombre)} OR nombre_completo = ${conexion.escape(nombre)}`, (err, res) => {
            if(err){
                console.log(err);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
};

const addFollow = (follow, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO seguir SET ?`, follow, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
};
const deleteFollow = (follow, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`DELETE FROM seguir WHERE id_usuario_seguido = ${conexion.escape(follow.id_usuario_seguido)} AND id_usuario_seguidor = ${conexion.escape(follow.id_usuario_seguidor)}`,(err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//comprobar si 2 usuarios se siguen
const checkFollow = (follow, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM seguir WHERE id_usuario_seguido = ${conexion.escape(follow.id_usuario_seguido)} AND id_usuario_seguidor = ${conexion.escape(follow.id_usuario_seguidor)}`, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
};

//cuantas publicaciones a hecho el usuario
const countPublicity = (id_usuario, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT COUNT(*) AS files FROM fotos WHERE id_usuario = ${conexion.escape(id_usuario)}`, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
};

//cuantos seguidores se tiene
const countFollower = (id_usuario, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT COUNT(*) AS files FROM seguir WHERE id_usuario_seguido = ${conexion.escape(id_usuario)}`, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
};

//a cuantas persinas sigue
const countFollow = (id_usuario, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT COUNT(*) AS files FROM seguir WHERE id_usuario_seguidor = ${conexion.escape(id_usuario)}`, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//dar like a las fotos
const addLike = (like, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO megusta SET ?`, like, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//comprobar like por id usuario
const getLikeById = (like, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM megusta WHERE id_usuario = ${conexion.escape(like.id_usuario)} AND id_foto = ${conexion.escape(like.id_foto)}`, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

module.exports = 
    {
        getAllUser,
        addUser,
        login,
        getUserById,
        addImagen,
        getImagenesById,
        getAllImagenes,
        getImagenByIdImagen,
        addComent,
        getComentByIdImagen,
        getUserByUserName,
        addFollow,
        deleteFollow,
        checkFollow,
        countPublicity,
        countFollower,
        countFollow,
        addLike,
        getLikeById
    }