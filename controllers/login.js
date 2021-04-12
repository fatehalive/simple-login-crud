const getEncrypt = require('../utils/getencrypt');
const generateAuthToken = require('../utils/generateauth');
const users = require('../utils/userstatic');

// Objek kosong simpan info user beserta authTokens
const authTokens = {};

const getLoginController = (req, res, next) => {
    res.render('login', {
        message: 'Selamat datang kembali, miaw! Silahkan login, miaw!',
        style: ''
    });
}

const postLoginController = (req, res, next) => {
    const { username, email, password } = req.body;
    const passwordEncrypted = getEncrypt(password);

    // pada elemen pertama array, pengecekan 3 input valuenya
    const user = users.find((u) => {
        return u.username === username && u.email === email && u.password === passwordEncrypted
    });

    if (user) {
        const authToken = generateAuthToken();

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
}

module.exports = {
    getLoginController: getLoginController,
    postLoginController: postLoginController
}