(function () {
    'use strict';

    module.exports = {
        editProject:editProject,
        createProject: createProject,
        projectPhaseUpdate: projectPhaseUpdate,
        changeProjectState: changeProjectState,
        addObjectiveToProject: addObjectiveToProject,
        deleteObjectiveFromProject: deleteObjectiveFromProject,
        addMemberToProject: addMemberToProject,
        removeMemberFromProject: removeMemberFromProject,
        fetchProjects: fetchProjects,
        fetchProjectByLeaderId,
        fetchProjectByIdentifier
    };

    const ProjectModel = require('./proyecto.module')().ProjectModel;
    const UserModel = require('../usuario/usuario.module')().UserModel;
    const InscriptionModel = require('../inscripciones/inscripciones.module')().InscriptionModel;
    const {formatDate} = require('../helpers/helperFunctions');


    async function editProject(identificador,nombre,objetivosGenerales,objetivosEspecificos,presupuesto) {
        
        console.log('objetivosEspecificos',objetivosEspecificos)
        //const proyectoEditado =  await ProjectModel.findOne({identificador:identificador})
        
        const proyectoEditado =  await ProjectModel.findOneAndUpdate({identificador:identificador}, {$set :{ 
            nombre: nombre,
            objetivosGenerales:objetivosGenerales,
            objetivosEspecificos:objetivosEspecificos,
            presupuesto:presupuesto
          }})
        if(proyectoEditado){
            return "Actualizado !"
        }else{
            return " No actualizado. Error"
        }
    }   
    
    async function fetchProjects() {
        return await ProjectModel.find({}).populate({path:"lider"}).populate({path:"avances"})
            .exec();
    }

    async function fetchProjectByLeaderId(leaderId) { 
        const datosLider = await UserModel.findOne({ identificacion: leaderId }); 
        if (datosLider) { 
            if(datosLider.tipoUsuario === "LIDER"){
                return await ProjectModel.find({lider: datosLider._id})
                .exec();
            }
        }
         
    }

    async function fetchProjectByIdentifier(idProyecto){
        return await ProjectModel.findOne({identificador: idProyecto}).populate({path:"lider"}).populate({path:"avances"})
    }

    
    async function createProject(project) {
        const liderExist = await UserModel.findOne({ identificacion: project.lider })
        if (liderExist && liderExist.tipoUsuario === "LIDER") {
            project.lider = liderExist.id;
            return await ProjectModel.create(project)
                .then((p) => { return true })
                .catch((err) => { console.log(err); return false });
        } else {
            return false;
        }
    }

    async function projectPhaseUpdate(projectId, newPhase){
        try{
            const project = await ProjectModel.findOne({identificador:projectId});
            switch(project.fase){
                case null:
                    if(newPhase === "INICIADO"){
                        await ProjectModel.findOneAndUpdate({identificador:projectId},{$set:{fase:newPhase}});
                        return true;
                    }else{
                        throw new Error("Phase change are incremental by 1. See phase options.")
                    }
                    break;
                case "INICIADO":
                    if(newPhase === "EN_DESARROLLO"){
                        await ProjectModel.findOneAndUpdate({identificador:projectId},{fase:newPhase});
                        return true;
                    }else{
                        throw new Error("Phase change are incremental by 1. See phase options.")
                    }
                    break;
                case "EN_DESARROLLO":
                    if(newPhase === "TERMINADO"){
                        await ProjectModel.findOneAndUpdate({identificador:projectId},{fase:newPhase, estado:"Inactivo"});
                        // fechaEgreso automatica cuando el proyecto Termina
                        await InscriptionModel.findOneAndUpdate({idProyecto:project.id},{$set:{fechaEgreso:formatDate()}});
                        return true;
                    }else{
                        throw new Error("Phase change are incremental by 1. See phase options.")
                    }
                    break;
                case "TERMINADO":
                    throw new Error("Project already Terminated. Create a new project");
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async function changeProjectState(id, newState){
        try{
            const project = await ProjectModel.findOne({identificador: id});
            if (project && project.fase != "TERMINADO" && project.estado != newState){
                await ProjectModel.findOneAndUpdate({identificador: id},{$set:{estado:newState}});
                // Precisión 6) 
                // La fecha de egreso en las inscripciones que están en estado “Aceptado” y que
                // cuya fecha de egreso está vacía, se debe guardar la fecha en la que se hizo 
                // la inactivación del proyecto.
                await InscriptionModel.updateMany({idProyecto:project.id, estado:"ACEPTADA", fechaEgreso:null},{$set:{fechaEgreso:formatDate()}});
                return true
            }else{
                console.log("Project state equals to newState or project is terminated.");
                return false;
            }
        }catch(err){
            console.log(err)
            return false;
        }
    }

    async function addObjectiveToProject(id, text, type) {
        try {
            const project = await ProjectModel.findOne({ identificador: id });
            if (project) {
                if (type === 'GENERAL') {
                    const isObjective = project.objetivosGenerales.filter(x => {
                        return ((x.identificador === text.identificador) || (x.texto === text.texto));
                    }).length != 0 ? true : false;
                    if (!isObjective) {
                        return await ProjectModel.findOneAndUpdate({ identificador: id }, { $push: { objetivosGenerales: text } }).then((p) => { return true })
                            .catch((err) => { console.log(err); return false });
                    } else {
                        return false;
                    }
                } else {
                    const isObjective = project.objetivosEspecificos.filter(x => {
                        return ((x.identificador === text.identificador) || (x.texto === text.texto));
                    }).length != 0 ? true : false;
                    if (!isObjective) {
                        return await ProjectModel.findOneAndUpdate({ identificador: id }, { $push: { objetivosEspecificos: text } }).then((p) => { return true })
                            .catch((err) => { console.log(err); return false });
                    } else {
                        return false;
                    }
                }
            } else {
                throw TypeError("Project not found")
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async function deleteObjectiveFromProject(projectId, objectiveType, objectiveId){
        try {
            const project = await ProjectModel.findOne({ identificador: projectId });
            if (project) {
                if (objectiveType === 'GENERAL') {
                    const isObjective = project.objetivosGenerales.filter(x => {
                        return ((x.identificador === objectiveId));
                    }).length == 0 ? true : false;
                    if (isObjective) {
                        return await ProjectModel.findOneAndUpdate({ identificador: projectId }, { $pull: { objetivosGenerales: {identificador: objectiveId} } }).then((p) => { return true })
                            .catch((err) => { console.log(err); return false });
                    } else {
                        return false;
                    }
                } else {
                    const isObjective = project.objetivosEspecificos.filter(x => {
                        return ((x.identificador === objectiveId));
                    }).length == 0 ? true : false;
                    if (!isObjective) {
                        return await ProjectModel.findOneAndUpdate({ identificador: projectId }, { $pull: { objetivosEspecificos: {identificador: objectiveId} } }).then((p) => { return true })
                            .catch((err) => { console.log(err); return false });
                    } else {
                        return false;
                    }
                }
            } else {
                throw TypeError("Project not found")
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    // ESTA NO VA !!MALA¡¡
    async function addMemberToProject(projectId, userId){
        try{
            const project = await ProjectModel.findOne({identificador: projectId});
            const user = await UserModel.findOne({identificacion: userId});
            // No se puede agregar integrantes en un projecto inactivo
            if(project.estado.toUpperCase() === "INACTIVO"){
                return false;
            // No se puede tener dos veces las misma persona integrada en un projecto activo
            }else if(project.integrantes.includes(user.id) && project.estado.toUpperCase() === "ACTIVO"){
                return false;
            }else{
                if(user.tipoUsuario.toUpperCase() === "ESTUDIANTE"){
                    // Agregar inscripcion si no esta
                    await InscriptionModel.create({idProyecto: project.id, idEstudiante: user.id})
                    // Agregar estudiane a proyecto
                    await ProjectModel.findOneAndUpdate({identificador: projectId},
                    {$push:{integrantes:user.id}})
                    return true;
                }
                
            }
        }catch(err){
            console.log("Project or user not found !!");
            console.log(err);
            return false;
        }
    }
    
    // ESTA NO VA !!MALA¡¡
    async function removeMemberFromProject(projectId, userId){
        try{
            const project = await ProjectModel.findOne({identificador: projectId});
            const user = await UserModel.findOne({identificacion: userId});
            if(project.integrantes.includes(user.id)){
                await ProjectModel.findOneAndUpdate({identificador: projectId},
                    {$pull: {integrantes:user.id}});
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log("Project or user not found !!");
            return false;
        }
    }
   

})();