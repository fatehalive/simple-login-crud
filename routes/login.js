const express = require('express');
const loginRouter = express.Router();

const getEncrypt = require('../utils/getencrypt');
const users = require('../utils/userstatic');

// const {getLoginController, postLoginController} = require('../controllers/login');

const {generateAuthToken, authToken, authTokens} = require('../utils/auth');

/* ><><>< Root = '/login' ><><>< */
// GET /login
loginRouter.get('/', (req, res, next) => {
    res.render('login', {
        message: 'Selamat datang kembali, miaw! Silahkan login, miaw!',
        style: ''
    });
});

// POST /login
loginRouter.post('/', (req, res, next) => {
    const {
        username,
        email,
        password
    } = req.body;
    const passwordEncrypted = getEncrypt(password);

    // pada elemen pertama array, pengecekan 3 input valuenya
    const user = users.find((u) => {
        return u.username === username && u.email === email && u.password === passwordEncrypted
    });

    if (user) {
        // Objek authtoken diisi dg men-generate token
        let authToken = authToken;
        authToken = generateAuthToken();

        // Store authentication token
        authTokens[authToken] = user;

        // Set auth token kedalam cookies
        res.cookie('AuthToken', authToken);

        // Redirect ke protected page
        res.redirect(301, '/dashboard');
    } else {
        res.render('login', {
            message: 'Oops coba lagi, miaw!',
            style: 'nes-text is-error'
        });
    }
});

module.exports = loginRouter;