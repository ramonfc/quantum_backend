const userTypeDefs = require('./modules/usuario/usuario.typedef');
const userResolvers = require('./modules/usuario/usuario.resolver');
const projectTypeDefs = require('./modules/proyecto/proyecto.typedef');
const projectResolvers = require('./modules/proyecto/proyecto.resolver');
const inscriptionTypeDefs = require('./modules/inscripciones/inscripciones.typedef');
const inscriptionResolvers = require('./modules/inscripciones/inscripciones.resolver');
const advanceTypeDefs = require('./modules/avances/avances.typedef');
const advanceResolvers = require('./modules/avances/avances.resolver');
const express = require('express');
const {merge} = require('lodash');
const { ApolloServer } = require('apollo-server-express');
let path = require('path');
let cors = require('cors');
let routes = require('./api/routes.js');
let UserController = require('./modules/usuario/usuario.module')().UserController;

let app = require('./app');
// let http = require('http');

const iniciarServidor = async () => {
    const app = express();
    // Setting Express
    app.use(cors());            // Cross Origin Resource Sharing.
    app.use(express());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // MongoDB
    let mongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil;
    await mongoDBUtil.init();
    // ApolloServer
    const apollo = new ApolloServer({
        typeDefs:[userTypeDefs, projectTypeDefs, inscriptionTypeDefs, advanceTypeDefs],
        resolvers:merge(userResolvers, projectResolvers, inscriptionResolvers, advanceResolvers)
    });
    await apollo.start();
    apollo.applyMiddleware({ app: app });
    // Set Port
    let port = normalizePort(process.env.PORT || 5000);
    // Start Routing
    app.use('/hola', (req, res, next) => {
        res.send("Hola Mundo");
    });
    app.use('/', routes);
    app.use('/usuarios', UserController);
    app.listen(port, () => { console.log("Server is listening: ", port); })
}

iniciarServidor();

// app.set('port',port);

// let server = http.createServer(app);

// server.listen(port,"",()=>{
//     console.log("Server is listening: ", port);
// });

function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port > 0) {
        return val;
    }

    return false;
};