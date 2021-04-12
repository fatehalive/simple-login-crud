const mongoose = require('mongoose');
const getEncrypt = require('../utils/getencrypt');

const {
    UserDB,
    BiodataDB,
    HistoryDB
} = require('./models/triInOne');

const getRegister = (req, res, next) => {
    // console.log(req)
    res.render('register', {
        message: 'Silahkan isi formulirnya, miaw!',
        style: ''
    });
}

const postRegister = (req, res, next) => {
    const {
        nama,
        kelamin,
        usia,
        username,
        email,
        password
    } = req.body;

    // pengecekan form
    (!nama) ? res.render('register', {
        message: 'Nama aja blm diisi, miaw!',
        style: 'nes-text is-error'
    }): next;
    (kelamin === '') ? res.render('register', {
        message: 'Kamu cowok apa cewek, miaw',
        style: 'nes-text is-error'
    }): next;
    // pengecekan kondisi umur, next kondisi berikutnya jika false
    (usia < 10) ? res.render('register', {
        message: 'Hanya untuk 10+ miaw!',
        style: 'nes-text is-error'
    }): next;
    
    (username === '') ? res.render('register', {
        message: 'Username diisi, miaw',
        style: 'nes-text is-error'
    }): next;
    // pengecekan string input email, skip jika false;
    (email === '') ? res.render('register', {
        message: 'Username diisi, miaw',
        style: 'nes-text is-error'
    }) : next;
    // (email !== email.indexOf('@')) ? res.render('register', {
    //     message: 'coba cek email lagi, miauw!',
    //     style: 'nes-text is-error'
    // }): next;
    // (email !== '*.com' && email !== '*.org' && email !== '*.co.id' && email !== '*.id') ? res.render('register', {
    //     message: 'coba pakai (.com/.org/.co.id/.id), miauw!',
    //     style: 'nes-text is-error'
    // }): next;
    // pengecekan jika password truthy value, maka dienkripsi dulu
    if (password) {const passwordEncrypted = getEncrypt(password)} else {res.render('register', {
        message: 'Password jgn lupa diisi, miauw!',
        style: 'nes-text is-error'
    })};
    // push data ke DB
    UserDB.username = username;
    UserDB.email = email;
    UserDB.password = passwordEncrypted;
    BiodataDB.nama = nama;
    BiodataDB.kelamin = kelamin;
    BiodataDB.usia = usia;
    HistoryDB.playing = 0;
    HistoryDB.win = 0;
    HistoryDB.lose = 0;
    HistoryDB.draw = 0;

    res.render('register', {
        message: 'Terimakasih, miaw! formulir berhasil terkirim..',
        style: 'nes-text is-success'
    });
    res.redirect(301, '/login');
}

module.exports = {
    getRegister: getRegister,
    postRegister: postRegister
};