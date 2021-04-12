const express = require('express');
const userRouter = express.Router();

const {createUser, readUsers, updateUser, deleteUser, readUser} = require('../controllers/users.js');

// POST reguler
userRouter.post('/', createUser());
// GET reguler
userRouter.get('/', readUsers());
// GET spesifik
userRouter.get('/:id', readUser());
// PUT spesifik
userRouter.put('/:id', updateUser());
// DELETE spesifik
userRouter.delete('/:id', deleteUser());

module.exports = userRouter;