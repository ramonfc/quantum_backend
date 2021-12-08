(function () {
    'use strict';

    module.exports = {
        fetchAdvances: fetchAdvances,
        fetchAdvancesByProjectId: fetchAdvancesByProjectId,
        addAdvance: addAdvance,
        addObservationToAdvance: addObservationToAdvance
    };

    const ProjectModel = require('../proyecto/proyecto.module')().ProjectModel;
    const UserModel = require('../usuario/usuario.module')().UserModel;
    const InscriptionModel = require('../inscripciones/inscripciones.module')().InscriptionModel;
    const AdvanceModel = require('./avances.module')().AdvanceModel;
    const { formatDate } = require('../helpers/helperFunctions');

    async function fetchAdvances() {
        try {
            return AdvanceModel.find({});

        } catch (err) {
            console.log(err);

        }
    }

    async function fetchAdvancesByProjectId(projectId) {
        const project = await ProjectModel.findOne({ identificador: projectId });
        if (project) {
            if (project.estado === "ACTIVO") {
                return await AdvanceModel.find({ idProyecto: project._id })
                    .exec();
            }
        }

    }

    async function addAdvance(projectId, advanceId, date, descriptions, observations) {
        try {
            const project = await ProjectModel.findOne({ identificador: projectId });
            // Cread avances
            const newAdvance = await AdvanceModel.create({ idProyecto: project._id, advanceId: advanceId, fecha: date, descripcion: descriptions, observaciones: observations })
            // Cambiar fase del proyecto
            if (project && project.fase === "INICIADO") {
                await ProjectModel.findOneAndUpdate({ identificador: projectId },
                    { fase: "EN_DESARROLLO", $push: { avances: newAdvance._id } })
            } else if (project.fase === "EN_DESARROLLO") {
                await ProjectModel.findOneAndUpdate({ identificador: projectId },
                    { $push: { avances: newAdvance._id } })
            };
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async function addObservationToAdvance(idProyecto, advanceId, observations) {
        try {
            const project = await ProjectModel.findOne({ identificador: idProyecto });
            const advance = await AdvanceModel.findOne({ idProyecto: project._id, advanceId: advanceId });
            if (project && advance) {
                await AdvanceModel.findOneAndUpdate({ _id: advance._id },
                    {$set: { observaciones: observations } })
            } 
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

})();