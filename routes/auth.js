const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')
const ensureLogin = require('connect-ensure-login')

const User = require('../models/User')
const Card = require('../models/Card')



//Signup process
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res)=>{

  const {username, password} = req.body

  if(username === '' || password === ''){
    res.render('auth/signup', {errorMessage: 'You have to fill all the fields'})
    return
  }

  User.findOne({username})
    .then((result)=>{
      if(!result){
        bcrypt.hash(password, 10)
          .then((hashedPassword)=>{
            User.create({username, password: hashedPassword})
              .then(()=>res.redirect('/'))
          })       
      } else {
        res.render('auth/signup', {errorMessage: 'This user already exists. Please, try again'})
      }
    })
    .catch((err)=>res.send(err)) 
})


//Login process 
router.get('/login', (req, res)=>{
  res.render('auth/login', {errorMessage: req.flash('error')})
})

router.post('/login', passport.authenticate("local", {
  successRedirect: '/cards/my-deck-of-cards',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}))

//Logout process 
router.get('/logout', (req, res)=>{
  req.logout()
  res.redirect('/')
})

module.exports = router;
