(function (){
    'use strict';

    module.exports = {
        addUser: addUser,
        getUsers: getUsers,
        getUserById: getUserById,
        modifyUser: modifyUser,
        removeUser: removeUser
    };

    var UserService = require('./usuario.module')().UserService;
    var BadRequest = require('../../util/errors');

    function testFormInput(formData){
        let {correo, identificacion, nombre, contrasena} = formData;
        return (!correo || !identificacion || !nombre || !contrasena)? true : false;
    }

    function addUser(req, res, next){
        try {
            if(testFormInput(req.body)){
                throw new BadRequest("Missing Requiered Field !!");
            }
            UserService.createUser(req.body).then(success).catch(failure);
            function success(data) {
                req.response = data;
                next();
            }
        
            function failure(error) {
                next(error);
            }
            
        } catch (error) {
            next(error);
        }
        
    };

    
    function getUsers(req, res, next) {

        UserService.fetchUsers()
            .then(success)
            .catch(failure);

        function success(data) {
            req.response = data;
            next();
        }

        function failure(err) {
            next(err);
        }

    }

    function getUserById(req, res, next) {
        UserService.fetchUserById(req.params.userId)
            .then(success)
            .catch(failure);

        function success(data) {
            req.response = data;
            next();
        }

        function failure(err) {
            next(err);
        }

    }

    function modifyUser(req, res, next) {
        UserService.updateUser(req.params.userId, req.body)
            .then(success)
            .catch(error);

        function success(data) {
            req.response = data;
            next();
        }

        function error(err) {
            next(err);
        }
    }

    function removeUser(req, res, next) {

        UserService.deleteUser(req.params.userId)
            .then(success)
            .catch(error);

        function success(data) {
            req.response = data;
            next();
        }

        function error(err) {
            next(err);
        }

    }

})();