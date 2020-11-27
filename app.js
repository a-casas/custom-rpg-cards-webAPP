require('dotenv').config();

const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const express       = require('express');
const favicon       = require('serve-favicon');
const hbs           = require('hbs');
const logger        = require('morgan');
const path          = require('path');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session       = require('express-session');
const bcrypt        = require('bcrypt')
const flash         = require('connect-flash')


const mongoose = require('mongoose');

mongoose
.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.armbm.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();



// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware de Session
app.use(session({secret: 'ourPassword', resave: true, saveUninitialized: true}))

//Middleware para serializar al usuario
passport.serializeUser((user, callback)=>{
  callback(null, user._id)
})

//Middleware para des-serializar al usuario
passport.deserializeUser((id, callback)=>{
  User.findById(id)
    .then((user) => callback(null, user))
    .catch((err) => callback(err))
})

//Middleware de flash
app.use(flash())

//Middleware del Strategy
passport.use(new LocalStrategy({passReqToCallback: true}, (req, username, password, next)=>{
  User.findOne({username})
    .then((user)=>{

      if(!user){
        return next(null, false, {message: "Incorrect username"})
      }

      if(!bcrypt.compareSync(password, user.password)){
        return next(null, false, {message: "Incorrect password"})
      }

      return next(null, user)
    })
    .catch((err) => next(err))
}))

//Middleware de passport
app.use(passport.initialize())
app.use(passport.session())


// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Custom RPG Cards!';

const index = require('./routes/index.routes');
app.use('/', index);

const auth = require('./routes/auth');
const User = require('./models/User');
app.use('/', auth)

const cards = require('./routes/cards');
app.use('/cards', cards )

const battlegrounds = require('./routes/battlegrounds');
app.use('/battlegrounds', battlegrounds )

const getInspired = require('./routes/getInspired');
app.use('/getInspired', getInspired )

module.exports = app;
