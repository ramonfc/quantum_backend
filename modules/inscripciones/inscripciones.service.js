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
    const {formatDate,dateNow} = require('../helpers/helperFunctions')

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
            console.log('estoy aqui')
            const project = await ProjectModel.findOne({identificador: projectId});
            console.log(project._id)
            const student = await UserModel.findOne({identificacion: studentId});
            console.log(student._id)
            //Buscamos una inscripcion pre existente
            const inscripcionExistente = await InscriptionModel.findOne({idProyecto: project._id, idEstudiante:student._id});
            if (inscripcionExistente)
            {
                console.log('YA EXISTE ESTA INSCRIPCION')
                return 'Ya te encuentras inscrito!'
            }
            if(project && project.estado === "ACTIVO" && project.fase != "TERMINADO" && student.tipoUsuario === "ESTUDIANTE"){
                // Agregar inscripcion si no esta
                await InscriptionModel.create({idProyecto: project.id, idEstudiante: student.id});
                return 'Te inscribiste con Exito!';
            }else{
                return 'Warning: El proyecto se encuentra Inactivo o Terminado!'
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async function changeInscriptionState(inscriptionId, newState){
        try{
            console.log('dateNow:', dateNow())
            const inscription = await InscriptionModel.findById(inscriptionId);
            if(inscription && inscription.estado != newState && (newState === "ACEPTADA" || newState ==="RECHAZADA")){
                // Acepte y agregar fecha de ingreso en la inscripcion
                
                await InscriptionModel.findByIdAndUpdate(inscriptionId,{$set:{estado:newState,fechaIngreso:dateNow()}});
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