const express = require('express');
const registerRouter = express.Router();
const {getRegisterController, postRegisterController} = require('../controllers/register');

// Root = '/register'
// GET /register
registerRouter.get('/', getRegisterController);
// POST /register
registerRouter.post('/', postRegisterController);

module.exports = registerRouter;