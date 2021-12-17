(function (){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        correo:{
            type: String,
            required: true,
            unique: true,
            dropDups: true
        },
        identificacion:{
            type: String,
            required: true,
            unique: true,
            dropDups: true 
        },
        nombre:{
            type: String,
            required: true
        },
        contrasena:{
            type: String,
            required: true
        },
        tipoUsuario:{
            type: String,
            enum:["ESTUDIANTE", "LIDER", "ADMINISTRADOR"]
        },
        estado:{
            type: String,
            enum:["PENDIENTE","AUTORIZADO","NO_AUTORIZADO"],
            required: false,
            default: 'PENDIENTE'
        },
        activo:{
            type: String,
            required: false,
            default: "ACTIVO"
        }

    },
    {
        timestamps : true
    });

    module.exports = mongoose.model('usuarios', userSchema);
})();