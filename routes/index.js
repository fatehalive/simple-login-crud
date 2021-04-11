const express = require('express');
const rootRouter = express.Router();

// const {testController} = require('../utils/testing')

// Root = '/' atau Homepage
// GET /
rootRouter.get('/', (req, res, next) => {
    console.log(`Your request is ${req.method} ${req.path}\n`);
    res.render('index');
});

module.exports = rootRouter;
