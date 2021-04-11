const express = require('express');
const PORT = 3000;

const app = express();

// Monolith dengan template engine EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Serving static files pada direktori '/public'
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Init data static
const users = [{
  // Init data super user ke array utk login
  usernama: 'admin',
  email: 'admin@binar.co.id',
  // ini hashed value dari 'admin'
  password: 'jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg='
}];

// Objek kosong simpan info user beserta authTokens
const authTokens = {};

// Import dan mount rootRouter (atau homepage)
const rootRouter = require('./routes/index.js');
app.use('/', rootRouter);

// Import dan mount registerRouter
const registerRouter = require('./routes/register');
app.use('/register', registerRouter);

// GET login
app.get('/login', (req, res, next) => {
  res.render('login', {
    message: 'Selamat datang kembali, miaw! Silahkan login, miaw!',
    style: ''
  });
});

// jangan lupa pindahkan ke login controller
const getEncrypt = require('./utils/getencrypt');

// POST login
app.post('/login', (req, res, next) => {
  const {
    username,
    email,
    password
  } = req.body;
  const passwordEncrypted = getEncrypt(password);

  // pada elemen pertama array, pengecekan 3 input valuenya
  const user = users.find((u) => {
    return u.username === username && u.email === email && hashedPassword === u.password
  });

  if (user) {
    const authToken = generateAuthToken();
  };

  // Store authentication token
  authTokens[authToken] = user;

  // Set auth token kedalam cookies
  res.cookie('AuthToken', authToken);

  // Redirect ke protected page
  res.redirect('/dashboard');

  res.status(301).render('dashboard');
});

// Import dan mount expressionsRouter
const expressionsRouter = require('./routes/expressions.js');
app.use('/expressions', expressionsRouter);

// Semua rute yang belum dibuat, kita respon hlm 404
const getError = require('./utils/error');
app.get('*', getError);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});