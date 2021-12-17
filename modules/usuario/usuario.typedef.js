const {gql} = require('apollo-server-express');

// GraphQL Schema definitions: Usuario, Proyecto
const userTypeDefs = gql`
    # User type allowed
   enum userType{
        ESTUDIANTE, LIDER, ADMINISTRADOR
    }
    # User state
    enum userState{
        PENDIENTE, AUTORIZADO, NO_AUTORIZADO
    }
    # User Active
    enum userActive{
        ACTIVO,
        INACTIVO
    }
    # User attributes
    type User{
        _id: ID
        correo: String
        identificacion: String
        nombre: String
        contrasena: String
        tipoUsuario: userType
        estado: userState
        activo: userActive
    }

    # Presition 2 userType can not be updated.
    input UserUpdateInfo{
        correo: String
        contrasena: String
        activo: userActive
        identificacion: String
    }

    input AddUserInput{
        correo: String 
        identificacion: String 
        nombre: String 
        contrasena: String   
        tipoUsuario: userType
    }

    # Manage user state (PENDIENTE, AUTORIZADO, NO AUTORIZADO)
    input UserUpdateState{
        estado: userState
    }
    # Queries to perform calls (READ) in User data source
    type Query{
        users: [User]
        findUserByMongoId(mongoId: String): User
        findUserByPersonalId(id: String): User
        findActiveUsers: [User]
        countUsers: Int
        countActiveUsers: Int
    }

    # Queries to perfor calls (CREATE, UPDATE, DELETE) in user data source.
    type Mutation{
        addUser(input:AddUserInput): Boolean
        changeUserState(id: String, state: userState): Boolean
        updateUser(newInfo:UserUpdateInfo): Boolean
        deleteUser(id: String): Boolean
        activeUser(id: String):Boolean
        inactiveUser(id: String): Boolean
    }
`;

module.exports = userTypeDefs;