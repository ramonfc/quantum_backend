const {gql} = require('apollo-server-express');


const typeDefs = gql `
    enum projectPhase{
        INICIADO,
        EN_DESARROLLO,
        TERMINADO,
        NULL
    }
    enum projectState{
        ACTIVO,
        INACTIVO
    }
    enum objectiveType{
        GENERAL,
        SPECIFIC
    }
    type Proyecto{
        identificador: String
        nombre: String
        integrantes: [Usuario]
        estado : String
        avances:[Avances]
        lider: Usuario
        objetivosGenerales: [String]
        objetivosEspecificos: [String]
        presupuesto: Int
        fase: projectPhase
    }
    type Avances{
        fecha: Date
        descripcion: String
        observaciones: String
    }
    type Usuario{
        nombre: String
        tipoUsuario: String
        estado:String
    }
    input objective{
        identificador: String
        texto : String
    }
    input UsuarioInput{
        correo: String
        identificacion: String
        nombre: String
        contrasena: String
        perfil: String
        activo: Boolean
    }
    input projectInput{
        identificador: String
        nombre: String
        objetivosGenerales: [String]
        objetivosEspecificos: [String]
        presupuesto: Float
        fechaInicio: String
        fechaFin: String
        lider: String 
    }

    input projectEditInput{ 
        identificador:String
        nombre: String
        objetivosGenerales: [String]
        objetivosEspecificos: [String]
        presupuesto: Float  
    }

    scalar Date
    
    type Query{
        proyectos:[Proyecto]
        findProjectByLeaderId(leader: String):[Proyecto] 
        projectByIdentifier(idProject: String): Proyecto
    }
    scalar Date
    # Queries to perfor calls (CREATE, UPDATE, DELETE) in proyect data source
    type Mutation{
        addProject(identificador: String, nombre: String,
            objetivosGenerales: [String],
            objetivosEspecificos: [String], 
            presupuesto: Float,
            fechaInicio: Date, 
            fechaFin: Date, 
            lider: String):Boolean,
        projectPhaseUpdate(projectId: String, newPhase: projectPhase):Boolean,
        changeProjectState(projectId: String, newState: projectState):Boolean,
        addObjectiveToProject(id:String, objective:objective, objectiveType: objectiveType):Boolean,
        deleteObjectiveFromProject(projectId:String, objectiveType: objectiveType, objectiveId: String):Boolean,
        addMemberToProject(projectId: String, userId: String):Boolean,
        removeMemberFromProject(projectId: String, userId: String):Boolean
        editProject(input: projectEditInput): String

    }
`;

module.exports = typeDefs;