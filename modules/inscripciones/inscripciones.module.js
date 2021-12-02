(function (){
    'use strict'
    
    module.exports = init;

    function init() {
        return {
            InscriptionModel: require('./inscripciones.model'),
            InscriptionService: require('./inscripciones.service')
        }
    }
})();