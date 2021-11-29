const inscriptionService = require('./inscripciones.module')().InscriptionService;


const inscriptionResolvers = {
    Query:{
        inscriptions: async (parent, args, context, info) =>{
            return await inscriptionService.fetchInscriptions();
        }
    },
    Mutation:{
        addInscription: async (parent, args, context, info) =>{
            return await inscriptionService.addInscription(args.projectId, args.studentId);
        },
        changeInscriptionState: async (parent, args, context, info) =>{
            return await inscriptionService.changeInscriptionState(args.inscriptionId, args.newState);
        }
    }
};

module.exports = inscriptionResolvers;