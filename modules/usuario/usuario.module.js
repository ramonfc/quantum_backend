(function () {
    'use strict';

    module.exports = init;

    function init() {
        return {
            UserController: require('./usuario.controller'),
            UserMiddleware: require('./usuario.middleware'),
            UserService: require('./usuario.service'),
            UserModel: require('./usuario.model')
        }
    }

})();