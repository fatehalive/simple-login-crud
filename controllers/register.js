const getEncrypt = require('../utils/getencrypt');

const getRegisterController = (req, res, next) => {
    // console.log(req)
    res.render('register', {
        message: 'Silahkan isi formulirnya, miaw!',
        style: ''
    });
}

const postRegisterController = (req, res, next) => {
    // console.log(req.body);
    const {
        name,
        kelamin,
        usia,
        username,
        email,
        password
    } = req.body;

    // pengecekan kondisi umur, next kondisi berikutnya jika false
    (usia < 10) ? res.render('register', {
        message: 'Hanya untuk 10+ miaw!',
        style: 'nes-text is-error'
    }): next;
    // pengecekan string input email coba-coba pakai regex, skip jika false;
    // (email !== email.indexOf('@')) ? res.render('register', {
    //     message: 'coba cek email lagi, miauw!',
    //     style: 'nes-text is-error'
    // }): next;
    // (email !== '*.com' && email !== '*.org' && email !== '*.co.id' && email !== '*.id') ? res.render('register', {
    //     message: 'coba pakai (.com/.org/.co.id/.id), miauw!',
    //     style: 'nes-text is-error'
    // }): next;
    // pengecekan jika password truthy value, maka dienkripsi dulu
    if (password) {
        const passwordEncrypted = getEncrypt(password);
        console.log(passwordEncrypted);
    }
    res.render('register', {
        message: 'Terimakasih, miaw! formulir berhasil terkirim..',
        style: 'nes-text is-success'
    });
    setTimeout(res.redirect(301, '/login'), 2000);
}

module.exports = {
    getRegisterController: getRegisterController,
    postRegisterController: postRegisterController
};