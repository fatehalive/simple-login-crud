const express = require('express');
const registerRouter = express.Router();
// const getEncrypt = require('../utils/getencrypt');

const {getRegister, postRegister} = require('../controllers/register');

// Root = '/register'
// GET /register
registerRouter.get('/', getRegister);
// POST /register
registerRouter.post('/', postRegister);

module.exports = registerRouter;