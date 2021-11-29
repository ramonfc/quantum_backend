(function (){
    'use strict'
    
    module.exports = init;

    function init() {
        return {
            ProjectController: require('./proyecto.controller'),
            ProjectMiddleware: require('./proyecto.middleware'),
            ProjectService: require('./proyecto.service'),
            ProjectModel: require('./proyecto.model')
        }
    }
})();