(function (){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        correo:{
            type: String,
            required: true
        },
        identificacion:{
            type: String,
            required: true
        },
        nombre:{
            type: String,
            required: true
        },
        contrasena:{
            type: String,
            required: true
        },
        usuario:{
            type: String,
            required: false,
            default: 'Pendiente'
        }

    });

    module.exports = mongoose.model('usuarios', userSchema);
})();