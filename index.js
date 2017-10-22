'use strict';
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    logger = require('morgan'),
    UserModel = require('./api/models/User'),
    Order = require('./api/models/Orders'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('./config/main'),
    passport = require('passport'),
    session = require('express-session'),
    FileStore = require('session-file-store')(session),
    livereload = require("connect-livereload");


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/db');


app.use('/css', express.static(__dirname + '/view/css'));
app.use('/js', express.static(__dirname + '/view/js'));

// Middelware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);
//const passport = require('passport');

//Routes
const route = require('./api/routes/todoListRoutes');

app.use('/', route);

//Catch 404 Err and forward them to err handler
/*
app.use((req, res, next)=>{
  const err = new Error('Not Found');
  err.status =404;
  next(err);
});



// err handler fuction
app.use((err, req, res, next)=>{
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  //respond to client
  res.status(status).json({
    error:{
      message: error.message
    }
  })
});
*/


const SessionOption = {
    name: 'my.connect.sid',
    secret: 'keyboard cat',
    cookie: {
        maxAge: 2628000000
    },
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
        path: __dirname + '/tmp',
        host: 'localhost', // optional 
        port: port // optional 
    }),
};
app.use(session(SessionOption));

app.listen(port, () => {
    console.log('todo list RESTful API server started on: ' + port);
});