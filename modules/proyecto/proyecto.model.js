(function (){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var proyectoSchema = new Schema({
        identificador:{
            type : String,
            required : true,
            immutable : true
        },
        nombre:{
            type : String,
            required : true
        },
        objetivosGenerales:{
            type : Array,
            require : true
        },
        objetivosEspecificos:{
            type : Array,
            required : true
        },
        presupuesto:{
            type :Number,
            required : true
        },
        fechaInicio:{
            type : Date,
            required : false,
            //default : Date.now
        },
        fechaFin:{
            type : Date,
            required : false
        },
        avances:[{
            type : Schema.Types.ObjectId,
            ref : "avances",
        }],
        lider:{
            type : Schema.Types.ObjectId,
            ref : "usuarios",
            required : true
        },
        integrantes:[{
            type : Schema.Types.ObjectId,
            ref : 'usuarios'
        }],
        estado:{
            type : String,
            default : "INACTIVO"
        },
        fase:{
            type : String,
            enum : ["INICIADO","EN_DESARROLLO","TERMINADO","NULL"],
            default : "NULL"
        },
    },
        {
            timestamps : true
        }
    );
    module.exports = mongoose.model("proyectos", proyectoSchema);
})();