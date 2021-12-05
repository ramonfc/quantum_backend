(function () {
    'use strict';

    module.exports = {
        fetchAdvances: fetchAdvances,
        addAdvance: addAdvance
    };

    const ProjectModel = require('../proyecto/proyecto.module')().ProjectModel;
    const UserModel = require('../usuario/usuario.module')().UserModel;
    const InscriptionModel = require('../inscripciones/inscripciones.module')().InscriptionModel;
    const AdvanceModel = require('./avances.module')().AdvanceModel;
    const {formatDate} = require('../helpers/helperFunctions');

   async function fetchAdvances(){
       try{
           return AdvanceModel.find({});
         
       }catch(err){
           console.log(err);
           
       }
   }

   async function addAdvance(projectId, date, descriptions, observations){
       try {
           const project = await ProjectModel.findOne({identificador:projectId});
           // Cread avances
           await AdvanceModel.create({idProyecto:project._id, fecha:date, descripcion:descriptions, observaciones:observations})
           // Cambiar fase del proyecto
           if(project && project.fase === "INICIADO"){
                await ProjectModel.findOneAndUpdate({identificador:projectId},{
                    fase:"EN_DESARROLLO"
                })
           };
           return true; 
       } catch (err) {
           console.log(err);
           return false;
       }
   }
})();