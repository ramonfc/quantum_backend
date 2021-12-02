(function (){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var avancesSchema = new Schema({
        idProyecto:{
            type : Schema.Types.ObjectId,
            ref : 'proyectos'
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
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    });

    module.exports = mongoose.model('avance', avancesSchema);
})();