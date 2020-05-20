// Config dotenv to init all variables in .env file
require('dotenv').config();

const createError    = require('http-errors');
const express        = require('express');
const path           = require('path');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const logger         = require('morgan');
const session        = require('express-session');
const flash          = require('connect-flash');
const passport       = require('passport');
const redis          = require('redis');
const redisClient    = redis.createClient();
const redisStore     = require('connect-redis')(session);
/* support multi-languages ['en', 'vn'] */
const i18n           = require("i18n-express"); 

const configDB       = require('./config/database');
const mongoose       = require('mongoose');
const app            = express();


const indexRouter   = require('./routes/index');
const adminRouter   = require('./routes/admin');                 
const usersRouter   = require('./routes/user');
const dataRouter    = require('./routes/design');
const gatewayRouter = require('./routes/gateway');
const drawingRouter = require('./routes/drawing');


// Connect to Database
mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true });   

// Load resource to config passport
require('./config/passport')(passport);                                      

                 


// View engine setup
app.set('views', [
  path.join(__dirname, 'views'), 
  path.join(__dirname, 'views/pagecomponent'), 
  path.join(__dirname, 'views/pageerror'), 
  path.join(__dirname, 'views/authentication'),
  path.join(__dirname, 'views/drawmodal'),
  path.join(__dirname, 'views/designmodal')
]);
app.set('view engine', 'ejs');

app.use(logger('dev'));            // use to display all request on console
app.use(express.json());         
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(bodyParser());           // get data from body of HTML form
app.use(session({
  name             : "_redisCache",
  secret           : process.env.SECRET || 'xxxxxxxx', 
  cookie           : { maxAge: 86400*1000 },  // maxAge = 15 minutes = 900000
  resave           : false,                   // forces the session to be saved back to the store
  saveUninitialized: false,                   // dont save unmodified
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(i18n({
  translationsPath:  path.join(__dirname,'config'),
  cookieLangName  : 'lang',
  paramLangName   : 'lang',
  defaultLang     : 'en',
  siteLangs       : ['vn', 'en'],
  textsVarName    : 'langs'
}));

app.use('/static',       express.static(path.join(__dirname, 'public')));
app.use('/admin/static', express.static(path.join(__dirname, 'public')));
app.use('/data/static',  express.static(path.join(__dirname, 'public')));
app.use('/users/static', express.static(path.join(__dirname, 'public')));

app.use('/',        indexRouter);
app.use('/admin',   adminRouter);
app.use('/user',    usersRouter);
app.use('/design',  dataRouter);
app.use('/gateway', gatewayRouter);
app.use('/drawing', drawingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  if (err.status == 404){
    res.render('error', {
      code: 404,
      content: "we are sorry, but the page you requested was not found!"
    });
  }else{
    res.render('error', {
      code: 500,
      content: "we are sorry, but the request of you was wrong!"
    })
  }
});

module.exports = app;
