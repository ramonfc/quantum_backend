const { countUsers } = require('./usuario.service');

const userService = require('./usuario.module')().UserService;
const userModel = require('./usuario.module')().UserModel;

const userResolvers = {
    Query:{
        users: async () => await userService.fetchUsers(),
        findUserByMongoId: async (parent, args, context, info) => await userService.fetchUserById(args.mongoId),
        findUserByPersonalId: async (parent, args, context, info) => await userService.fetchUserByPersonalId(args.id),
        findActiveUsers: async (parent, args, context, info) =>await userService.fetchActiveUsers(args.estado),
        countUsers: async() => await userService.countUsers(),
        countActiveUsers: async() => await userService.countActiveUsers()
    },
    Mutation:{
        addUser: async(parent, args, context, info) => {
            return await userService.createUser(args)
        },
        changeUserState: async(parent, args, context, info) => {
            return await userService.changeUserState(args.id, args.state);
        },
        updateUser: async(parent, args, context, info) =>{
            return await userService.updateUser(args.id, args.newInfo)
        },
        deleteUser: async(parent, args, context, info) => {
            return await userService.deleteUser(args.id)
        },
        activeUser: async(parent, args, context, info) => {
            return await userService.activeUser(args.id)
        },
        inactiveUser:async(parent, args, context, info) =>{
            return await userService.inactiveUser(args.id)
        }

    }
}

module.exports = userResolvers;

