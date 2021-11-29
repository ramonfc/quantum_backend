const AdvanceService = require('./avances.module')().AdvancesService;

const avancesResolvers = {
    Query:{
        advances: async(parent, args, context, info) =>{
            return AdvanceService.fetchAdvances();
        }
    },
    Mutation:{
        addAdvance: async(parent, args, context, info) =>{
            return AdvanceService.addAdvance(args.idProyecto, args.fecha, args.descripciones, args.observaciones );
        }
    }
}

module.exports = avancesResolvers;