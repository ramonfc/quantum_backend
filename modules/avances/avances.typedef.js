const {gql} = require('apollo-server-express');

const typeDef = gql `
    type Observacion {
        fecha: Date
        observaciones: String
    }
    type avance{
        idProyecto: String,
        advanceId: String
        fecha : Date,
        descripcion: String,
        observaciones: Observacion
    }
    input Observation{        
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
            descripciones: String, 
            observaciones: String):Boolean
        addObservationToAdvance(idProyecto: String,
            advanceId: String,
            observaciones: String):Boolean
    

    }
`;

module.exports = typeDef;