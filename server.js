const express = require('express');
const ejs = require('ejs');

const app = express();

const PORT = 4444;

app.set('view engine', 'ejs');
app.set('views', 'views');

// Untuk serving static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// Import dan mount indexRouter
const indexRouter = require('./routes/index.js');
app.use('/', indexRouter);

// Import dan mount expressionsRouter
const expressionsRouter = require('./routes/expressions.js');
app.use('/expressions', expressionsRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});