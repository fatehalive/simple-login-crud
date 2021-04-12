const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username tidak boleh kosong"]
    },
    email: {
        type: String,
        required: [true, "email tidak boleh kosong"]
    },
    password: {
        type: String,
        required: [true, "password tidak boleh kosong"]
    }
}, {
    timestamps: true
});

const BiodataSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserGame' },
    nama: String,
    kelamin: String,
    Usia: Number
}, {
    timestamps: true
});

const HistorySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserGame' },
    playing: Number,
    win: Number,
    draw: Number
});

const UserDB = mongoose.model('User_game', UserSchema);
const BiodataDB = mongoose.model('User_game_biodata', BiodataSchema);
const HistoryDB = mongoose.model('User_game_history', HistorySchema);

module.exports = {
    UserDB,
    BiodataDB,
    HistoryDB
};