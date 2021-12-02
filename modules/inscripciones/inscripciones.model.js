(function(){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var inscriptionSchema = new Schema({
        idProyecto:{
            type: Schema.Types.ObjectId,
            ref: 'proyectos',
            required: true
        },
        idEstudiante:{
            type: Schema.Types.ObjectId,
            ref: 'usuarios',
            required: true
        },
        fechaIngreso:{
            type: Date,
            default:""
        },
        fechaEgreso:{
            type: Date,
            default:""
        },
        estado:{
            type: String,
            enum:["ACEPTADA", "RECHAZADA",null],
            default: null
        }
    },{timestamps : true});

    module.exports = mongoose.model('inscripcion',inscriptionSchema,"inscripcion")
})();