(function (){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var avancesSchema = new Schema({
        idProyecto:{
            type : Schema.Types.ObjectId,
            ref : 'proyectos'
        },
        advanceId:{
            type : String,
            required : true
        },
        fecha:{
            type : Date,
            required : true
        },
        // duenoDescripcion:{
        //     type : Schema.Types.ObjectId,
        //     ref : 'usuarios'
        // },
        descripcion:{
            type : String,
            required : true
        },
        observaciones:{
            type : Object,
            required : false
        },

      /*   observaciones:[{
            fecha : Date,
            observaciones: String
        }] */
    },
    {
        timestamps : true
    });

    module.exports = mongoose.model('avances', avancesSchema);
})();