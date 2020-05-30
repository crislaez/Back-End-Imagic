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
const addUserById = (id, callback) => {
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

module.exports = 
    {
        getAllUser,
        addUser,
        login,
        addUserById
    }