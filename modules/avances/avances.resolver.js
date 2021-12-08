const AdvanceService = require('./avances.module')().AdvancesService;

const avancesResolvers = {
    Query:{
        advances: async(parent, args, context, info) =>{
            return AdvanceService.fetchAdvances();
        },
        advancesByProjectId: async(parent, args, context, info) =>{
            return AdvanceService.fetchAdvancesByProjectId(args.projectId);
        },
    },
    Mutation:{
        addAdvance: async(parent, args, context, info) =>{
            return AdvanceService.addAdvance(args.idProyecto, args.advanceId, args.fecha, args.descripciones, args.observaciones );
        },
        addObservationToAdvance: async(parent, args, context, info) =>{
            return AdvanceService.addObservationToAdvance(args.idProyecto, args.advanceId, args.observaciones );
        },
    }
}

module.exports = avancesResolvers;