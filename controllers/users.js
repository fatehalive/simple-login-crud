const express = require('express');
const {UserDB, BiodataDB, HistoryDB} = require('./models/triInOne');

const createUser = async (req, res, next) => {
    const {
        username,
        email,
        password
    } = await req.body;

    const user = await UserDB.create({
        username,
        email,
        password
    })
    if (user) {
        const getNumber = () => {
            Math.floor(Math.random() * 11);
        }
        BiodataDB.create({
            user_id: user.id
        })
        HistoryDB.create({
            user_id: user.id,
            playing: getNumber(),
            win: getNumber(),
            lose: getNumber()
        })
    }
    return res.json(userGame)
}

const readUsers = async (req, res, next) => {
    const user = await UserDB.find()
    return res.json(user);
};

const updateUser = (req, res, next) => {
    const id = req.params.id;
    const {
        username,
        email,
        password
    } = req.body;
    const user = UserDB.findById(id);
    user.username = username || UserDB.username;
    user.email = email || UserDB.email;
    user.password = password || UserDB.password;
    user.save();
    res.json(userGame);
}

const deleteUser = (req, res, next) => {
    const id = req.params.id;
    UserDB.findByIdAndDelete(id);
    res.json(UserDB.find());
}

const readUser = (req, res, next) => {
    const id = req.params.id;
    const user = UserDB.findById(id);
    res.json(user);
}

module.exports = {
    createUser: createUser,
    readUsers: readUsers,
    readUser: readUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}