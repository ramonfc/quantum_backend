const {gql} = require('apollo-server-express');

// GraphQL Schema definitions: Usuario, Proyecto
const dateTypeDefs = gql`
    scalar Date
    type Scalar{
        
    }
     
`;

module.exports = userTypeDefs;