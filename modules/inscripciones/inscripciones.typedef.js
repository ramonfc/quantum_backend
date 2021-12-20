const {gql} = require('apollo-server-express');

const typeDefs = gql`
    enum inscriptionState{
        ACEPTADA, RECHAZADA, PENDIENTE
    }
    type inscription{
        _id: ID
        idProyecto: String
        idEstudiante: String
        estado:inscriptionState
        fdechaIngreso: String
        fechaEgreso: String
    }
    type Query{
        inscriptions:[inscription]
        inscriptionsByProject(idProject: String):[inscription]
    }
    type Mutation{
        addInscription(projectId: String, studentId: String): String,
        changeInscriptionState(inscriptionId: String, newState: inscriptionState):Boolean
    }
`;

module.exports = typeDefs;