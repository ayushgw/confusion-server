const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
require('./db/mongoose')

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const dishRouter = require('./routes/dishes');
const commentRouter = require('./routes/comments');
const promoRouter = require('./routes/promos');
const leaderRouter = require('./routes/leaders');
const favouriteRouter = require('./routes/favourites');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views')

// view engine setup
app.set('view engine', 'jade');
app.set('views', viewsPath);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDirectoryPath));

app.use(indexRouter)
app.use(userRouter)
app.use(dishRouter)
app.use(commentRouter)
app.use(promoRouter)
app.use(leaderRouter)
app.use(favouriteRouter)


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is up at ${port}`);
})