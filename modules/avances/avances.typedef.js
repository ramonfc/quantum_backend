const {gql} = require('apollo-server-express');

const typeDef = gql `
    
    type avance{
        idProyecto: String,
        advanceId: String
        fecha : String,
        descripcion: String,
        observaciones: String
    }
    input Observation{
        fecha: Date
        observaciones: String
    }
    type Query{
        advances: [avance]
        advancesByProjectId(projectId: String): [avance]
    }
    scalar Date
    type Mutation{
        addAdvance(idProyecto: String,
            advanceId: String, 
            fecha: Date, 
            descripciones: String, 
            observaciones: String):Boolean
        addObservationToAdvance(idProyecto: String,
            advanceId: String,
            observaciones: Observation):Boolean
    
    
    }
`;

module.exports = typeDef;