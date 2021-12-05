(function(){
    'use strict';

    module.exports = {
        fetchInscriptions: fetchInscriptions,
        fetchInscriptionsByProject: fetchInscriptionsByProject,
        addInscription : addInscription,
        changeInscriptionState: changeInscriptionState
    }

    const InscriptionModel = require('./inscripciones.module')().InscriptionModel;
    const ProjectModel = require('../proyecto/proyecto.module')().ProjectModel;
    const UserModel = require('../usuario/usuario.module')().UserModel;
    const {formatDate} = require('../helpers/helperFunctions')

    async function fetchInscriptions(){
        return await InscriptionModel.find({});
    }

    async function fetchInscriptionsByProject(idProject){
        const project = await ProjectModel.findOne({identificador: idProject});
        if(project) {
            return await InscriptionModel.find({idProyecto: project._id})
        }
    }

    async function addInscription(projectId, studentId){
        try{
            const project = await ProjectModel.findOne({identificador: projectId});
            const student = await UserModel.findOne({identificacion: studentId});
            if(project && project.estado === "ACTIVO" && project.fase != "TERMINADO" && student.tipoUsuario === "ESTUDIANTE"){
                // Agregar inscripcion si no esta
                await InscriptionModel.create({idProyecto: project.id, idEstudiante: student.id});
                return true;
            }else{
                return false
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async function changeInscriptionState(inscriptionId, newState){
        try{
            const inscription = await InscriptionModel.findById(inscriptionId);
            if(inscription && inscription.estado != newState && newState === "ACEPTADA"){
                // Acepte y agregar fecha de ingreso en la inscripcion
                await InscriptionModel.findByIdAndUpdate(inscriptionId,{$set:{estado:newState,fechaIngreso:formatDate()}});
                // Agregar al equipo solo si no pertenece al mismo y no estaba agregado previamente
                console.log(inscription.idProyecto);
                const a = await ProjectModel.findOneAndUpdate({_id:inscription.idProyecto},{$addToSet:{integrantes:inscription.idEstudiante}});
                // await ProjectModel.findByIdAndUpdate(inscription.idProyecto,[{$set:{"integrantes":{$cond:{if:{$in:[inscription.idEstudiante,'$integrantes']},then:"$integrantes",else:{$concatArrays:[["$integrantes"],[inscription.idEstudiante]]}}}}}]);
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }
})();