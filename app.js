let createError = require('http-errors');
let express = require('express');
let path = require('path');
let debug = require('debug')('spammer:server');
let cookieParser = require('cookie-parser');
let lessMiddleware = require('less-middleware');
let logger = require('morgan');
let mongoose = require('mongoose');

//connect to MongoDB
mongoose.connect('mongodb://localhost/clientsDatabase', {
    useNewUrlParser: true, useUnifiedTopology: true
});
let db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    debug('successfully connected to mongo db');
});

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse incoming requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = {app, db};
