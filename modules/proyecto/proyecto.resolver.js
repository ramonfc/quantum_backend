const projectService = require('./proyecto.module')().ProjectService;


const projectResolvers = {
    Mutation:{
        addProject: async(parent, args, context, info) => {
            return await projectService.createProject(args)
        },
        projectPhaseUpdate: async (parent, args, context, info) =>{
            return await projectService.projectPhaseUpdate(args.projectId, args.newPhase);
        },
        changeProjectState: async (parent, args, context, info) =>{
            return await projectService.changeProjectState(args.projectId, args.newState);
        },
        addObjectiveToProject: async(parent, args, context, info) => {
            return await projectService.addObjectiveToProject(args.id, args.objective, args.objectiveType);
        },
        deleteObjectiveFromProject: async(parent, args, context, info) =>{
            return await projectService.deleteObjectiveFromProject(args.projectId, args.objectiveType, args.objectiveId);
        },
        addMemberToProject: async(parent, args, context, info) => {
            return await projectService.addMemberToProject(args.projectId, args.userId);
        },
        removeMemberFromProject: async(parent, args, context, info) => {
            return await projectService.removeMemberFromProject(args.projectId, args.userId);
        }
    }
};

module.exports = projectResolvers;