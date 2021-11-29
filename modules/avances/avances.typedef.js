const {gql} = require('apollo-server-express');

const typeDef = gql `
    
    type avance{
        idProyecto: String,
        fecha : String,
        descripcion: String,
        observacion: String
    }
    type Query{
        advances: [avance]
    }
    scalar Date
    type Mutation{
        addAdvance(idProyecto: String, 
            fecha: Date, 
            descripciones: String, 
            observaciones: String):Boolean
    }
`;

module.exports = typeDef;