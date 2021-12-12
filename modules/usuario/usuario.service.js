const aes256 = require('aes256');

(function () {
    'use strict';

    module.exports = {
        createUser: createUser,
        changeUserState: changeUserState,
        fetchUsers: fetchUsers,
        fetchUserById: fetchUserById,
        fetchUserByPersonalId: fetchUserByPersonalId,
        fetchActiveUsers: fetchActiveUsers,
        countActiveUsers: countActiveUsers,
        activeUser: activeUser,
        inactiveUser: inactiveUser,
        countUsers: countUsers,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    const key = "porquemambrusefuealaguerra?";

    var UserModel = require('./usuario.module')().UserModel;

    async function createUser(User) {

        /* const contrasenaEncriptada = encrypt(key, User.input.contrasena)
        console.log("Encriptada:",contrasenaEncriptada);
        User.input.contrasena = contrasenaEncriptada; */
        const { contrasena } = User.input;
        const nuevoUsuario = new UserModel(User.input);
        const encryptedPlainText = aes256.encrypt(key, contrasena);
        nuevoUsuario.contrasena = encryptedPlainText
        return nuevoUsuario.save()

       /*  return await UserModel.create(User.input) */
            .then((u) => { return true })
            .catch((err) => { return false });
    }
    async function changeUserState(UserId, newState) {
        try {
            let user = await UserModel.findOne({ "identificacion": UserId });
            if (user.estado !== newState) {
                await UserModel.findOneAndUpdate({ "identificacion": UserId }, { $set: { estado: newState } })
                return true
            } else {
                console.log("newState equals to old user state.")
                return false
            }
        } catch (err) {
            console.log("User with id ", UserId, " not found.")
            console.log(err)
            return false
        }
        return await UserModel.findOneAndUpdate({ identificacion: UserId }, { estado: newState })
            .then((u) => { return true })
            .catch((err) => { return false });
    }

    async function fetchUsers() {
        return await UserModel.find({})
            .exec();
    }

    async function fetchUserById(UserId) {
        return await UserModel.findById(UserId)
            .exec();
    }

    async function fetchUserByPersonalId(UserId) {
        console.log(UserId);
        return await UserModel.findOne({ identificacion: UserId })
            .exec();
    }

    async function fetchActiveUsers() {
        return await UserModel.find({ activo: true })
            .exec();
    }

    async function countActiveUsers() {
        return await UserModel.countDocuments({ activo: true })
            .exec();
    }

    async function countUsers() {
        return await UserModel.estimatedDocumentCount()
            .exec();
    }

    async function updateUser(UserId, newUserInfo) {
        console.log("Id:",UserId);
        console.log("Info:",newUserInfo);
        return await UserModel
            .findOneAndUpdate({ "identificacion": UserId }, { $set: newUserInfo }).then((u) => { return (u == null) ? false : true });
    }

    async function deleteUser(UserId) {
        let user = await (await UserModel.deleteOne({ "identificacion": UserId })).deletedCount
        return (user == 0) ? false : true;
    }

    async function activeUser(UserId) {
        try {
            let user = await fetchUserByPersonalId(UserId)
                .then((u) => { return u }).catch((err) => { console.log(err) });
            if (user.activo === false) {
                await UserModel.findOneAndUpdate({ "identificacion": UserId }, { $set: { activo: true } })
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log("User with id ", UserId, " not found.")
            console.log(err)
            return false
        }
    }

    async function inactiveUser(UserId) {
        try {
            let user = await UserModel.findOne({ "identificacion": UserId });
            if (user.activo === true) {
                await UserModel.findOneAndUpdate({ "identificacion": UserId }, { $set: { activo: false } })
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log("User with id ", UserId, " not found.")
            console.log(err)
            return false
        }
    }

})();