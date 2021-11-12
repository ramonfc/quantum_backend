(function () {
    'use strict';

    module.exports = {
        createUser: createUser,
        fetchUsers: fetchUsers,
        fetchUserById: fetchUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    var UserModel = require('./usuario.module')().UserModel;

    function createUser(User) {
        return UserModel.create(User);
    }

    function fetchUsers() {
        return UserModel.find({})
            .exec();
    }

    function fetchUserById(UserId) {
        return UserModel.findById(UserId)
            .exec();
    }

    function updateUser(UserId, User) {
        return UserModel
            .findByIdAndUpdate(UserId, User, {new: true})
            .exec();
    }

    function deleteUser(UserId) {
        return UserModel
            .findByIdAndRemove(UserId)
            .exec();
    }

})();