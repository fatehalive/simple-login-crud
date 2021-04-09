const express = require('express');
const router = express.Router();

const {readUser, createUser, updateUser, deleteUser} = require('../controllers/users.js');

// GET reguler
router.get('/', readUser());

// GET spesifik
router.get('/:id', readUser());

// POST reguler
router.post('/', createUser());

// PUT spesifik
router.put('/:id', updateUser());

// DELETE spesifik
router.delete('/:id', deleteUser());