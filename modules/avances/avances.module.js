(function (){
    'use strict'
    
    module.exports = init;

    function init() {
        return {
            AdvanceModel: require('./avances.model'),
            AdvancesService: require('./avances.service')
        }
    }
})();