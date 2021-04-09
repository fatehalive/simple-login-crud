const express = require('express');

const createUser = (req, res, next) => {
    const tangkap = req.body.id;
    res.send(`value ${tangkap}`);
};

const readUser = (req, res, next) => {
    res.status(200).render('index', {
        title: 'Halaman Welcome'
    });
};

const updateUser = (req, res, next) => {
    const tangkap = req.params.id;
    res.send(`value ${tangkap}`);
};

const deleteUser = (req, res, next) => {
    const tangkap = req.params.id;
    res.send(`value ${tangkap}`);
};

module.exports = {
    createUser: createUser,
    readUser: readUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}