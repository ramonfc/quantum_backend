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
    # User attributes
    type User{
        correo: String
        identificacion: String
        nombre: String
        contrasena: String
        tipoUsuario: userType
        estadoUsuario: userState
        activo: Boolean
    }

    # Presition 2 userType can not be updated.
    input UserUpdateInfo{
        correo: String
        nombre: String
        contrasena: String
    }
    # Manage user state (PENDIENTE, AUTORIZADO, NO AUTORIZADO)
    input UserUpdateState{
        estadoUsuario: userState
    }
    # Queries to perform calls (READ) in User data source
    type Query{
        users: [User]
        findUserByMongoId(mongoId: String): User
        findUserByPersonalId(id: String): User
        findActiveUsers(estado: Boolean = True): [User]
        countUsers: Int
        countActiveUsers: Int
    }

    # Queries to perfor calls (CREATE, UPDATE, DELETE) in user data source
    type Mutation{
        addUser(correo: String, identificacion: String, 
            nombre: String, contrasena: String, 
            estado: userState = PENDIENTE, tipoUsuario: userType, activo: Boolean= True): Boolean
        changeUserState(id: String, state: userState): Boolean
        updateUser(id: String, newInfo:UserUpdateInfo): Boolean
        deleteUser(id: String): Boolean
        activeUser(id: String):Boolean
        inactiveUser(id: String): Boolean
    }
`;

module.exports = userTypeDefs;