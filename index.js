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
  config = require('./config/main');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database); 


// Middelware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
const users = require('./api/routes/todoListRoutes');

app.use('/users', users);

//Catch 404 Err and forward them to err handler

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


app.listen(port,()=>{
  console.log('todo list RESTful API server started on: ' + port);
});


