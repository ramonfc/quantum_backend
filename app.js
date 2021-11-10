let express = require('express');
let path = require('path');
let cors = require('cors');
let routes = require('./api/routes.js');
let UserController = require('./modules/usuario/usuario.module')().UserController;

const app = express();

// Setting Express
app.use(cors());            // Cross Origin Resource Sharing.
app.use(express());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// MongoDB
let mongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil;
mongoDBUtil.init();

// Start Routing Process
app.use('/',routes);
app.use('/usuarios', UserController);

module.exports = app;