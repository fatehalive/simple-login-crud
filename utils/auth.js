const crypto = require('crypto');

// Yang saya tangkap dari buku eloquentjavascript.
// Protokol HTTP ada 3 komponen utama setiap request responnya:
// 1. Deklarasi nama protokol, method beserta URI, status code dll
// 2. Headers (disini banyak sekali informasi)
// 3. Body (opsional)
// JWT atau JSON Web Token untuk disisipkan ke response header.
// respon header nantinya akan disimpan di sisi client baik itu
// local storage atau session storage. Tapi, cookies juga bisa sebagai
// tempat penyimpanan JWT.

// Fungsi untuk init JWT atau JSON Web Token
const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
};

// Token tsb nanti masuk kesini
var authToken = {};

// Lalu dimasukkan ke objek ini
var authTokens = {};

module.exports = {
    generateAuthToken: generateAuthToken,
    authToken: authToken,
    authTokens: authTokens
};