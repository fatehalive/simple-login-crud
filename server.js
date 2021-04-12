const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = 3000;
const app = express();

const {UserDB, BiodataDB, HistoryDB} = require('./models/triInOne');

// Monolith dengan template engine EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Serving static files pada direktori '/public'
app.use(express.static('public'));
// Untuk parsing url encoded x-www-application/form
app.use(express.urlencoded({
  extended: true
}));
// Untuk parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// // Inject request user
// app.use((req, res, next) => {
//   // Get auth token from the cookies
//   const authToken = req.cookies['AuthToken'];

//   // Inject the user to the request
//   req.user = authTokens[authToken];

//   next();
// });

// Import dan mount rootRouter (atau homepage)
const rootRouter = require('./routes/index.js');
app.use('/', rootRouter);

// Import dan mount registerRouter
const registerRouter = require('./routes/register');
app.use('/register', registerRouter);

// Import dan mount loginRouter
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

// Import dan mount dashboardRouter
const dashboardRouter = require('./routes/dashboard');
app.use('/dashboard', dashboardRouter);

// Jangan lupa pecah kode ke routes dan controller !
// CREATE
app.post('/users', async (req, res, next) => {
  const { username, email, password } = await req.body;

  const user = await UserDB.create({username, email, password})
  if (user) {
    const getNumber = () => {
      Math.floor(Math.random() * 11);
    }
    BiodataDB.create({user_id: user.id})
    HistoryDB.create({user_id: user.id, playing: getNumber(), win : getNumber(), lose: getNumber()})
  }
  return res.json(userGame)
})
// READ
app.get('/users', async (req, res, next) => {
    const user = await UserDB.find()
    return res.json(user);
})
// UPDATE
app.put('/users/:id', (req, res, next) => {
  const id = req.params.id;
  const { username, email, password } = req.body;
  const user = UserDB.findById(id);
  user.username = username || UserDB.username;
  user.email = email || UserDB.email;
  user.password = password || UserDB.password;
  user.save();
  res.json(userGame);
})
// DELETE
app.delete('/users/:id', (req, res, next) => {
  const id = req.params.id;
  UserDB.findByIdAndDelete(id);
  res.json(UserDB.find());
})
// FIND
app.get('users/:id', (req, res, next) => {
  const id = req.params.id;
  const user = UserDB.findById(id);
  res.json(user);
})

// Semua rute yang belum dibuat, kita respon hlm 404
const getError = require('./utils/error');
app.get('*', getError);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
  mongoose
  .connect('mongodb://localhost/bootcamp_binar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Mongodb Connected'))
  .catch((err) => console.log(err));
});