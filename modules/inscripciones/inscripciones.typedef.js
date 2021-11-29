const {gql} = require('apollo-server-express');

const typeDefs = gql`
    enum inscriptionState{
        ACEPTADA, RECHAZADA
    }
    type inscription{
        projectId: String
        userId: String
        inscriptionState:inscriptionState
        dateIn: String
        dateOut: String
    }
    type Query{
        inscriptions:[inscription]
    }
    type Mutation{
        addInscription(projectId: String, studentId: String): Boolean,
        changeInscriptionState(inscriptionId: String, newState: inscriptionState):Boolean
    }
`;

module.exports = typeDefs;