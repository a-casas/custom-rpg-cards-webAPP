const express = require('express');
const router = express.Router();
const bcrypt         = require("bcrypt");

const Card = require('../models/Card');

const checkForAuthentication = require('../configs/authentication')

//Listing all cards in the DB (Does not require User authentication).
router.get('/', (req, res, next) => {
    Card
    .find()
    .then((card)=>{
        console.log(card)
        res.render('cards/index', {card})
    })
    .catch((error)=>{
        console.log(error)
        res.send(error)
    })
});

//All cards details (Does not require User authentication. It is not possible to edit them).
router.get('/details/:id', (req, res, next) => {

    const cardId = req.params.id

    Card
    .findById(cardId)
    .then(oneCard => {
        res.render('cards/showPublic', oneCard)
    })
    .catch((error)=>{
        console.log(error)
        res.send(error)
    })
})



//List my Cards in My Deck of Cards (Require User authentication).
router.get('/my-deck-of-cards', checkForAuthentication, (req, res, next)=>{

    Card.find({owner: req.user._id})
      .then((result)=>{
        res.render('cards/myCardsDeck', {card: result, user: req.user.username})
      })
      .catch((err)=>{
        res.send(err)
      })
})

//My Cards details (Requires User authentication + User ID / Card Owner matching to edit them)
router.get('/my-deck-of-cards/details/:id', checkForAuthentication, (req, res, next) => {

    const cardId = req.params.id

    Card
    .findById(cardId)
    .then(oneCard => {
        res.render('cards/show', oneCard)
    })
    .catch((error)=>{
        console.log(error)
        res.send(error)
    })
})


//Add new Card (Requires User authentication).
router.get('/my-deck-of-cards/new-card', checkForAuthentication, (req, res, next) => {
    res.render('cards/new') 
  })
  
  
router.post('/my-deck-of-cards', (req, res)=>{
    const {name, race, classe, avatarHead, avatarEyes, avatarMouth, avatarHair, avatarBody, avatarHelmet, hitPoints, attackPower, specialSkill} = req.body
    const id = req.user._id
    
    if(name === '' || race === '' || classe === '' || avatarHead === '' || avatarEyes === '' || avatarMouth === ''|| avatarHair === '' || avatarBody === '' || avatarHelmet === '' || hitPoints === '' || attackPower === '' || specialSkill === '' ){
        res.render('cards/new', {errorMessage: 'In order to create the card correctly, all fields are required. Please, check them.'})
        return
    }

    Card
    .create({name, race, classe, avatarHead, avatarEyes, avatarMouth, avatarHair, avatarBody, avatarHelmet, hitPoints, attackPower, specialSkill, owner: id})
    .then((result) => { res.redirect('/cards/my-deck-of-cards')
    console.log(result) })
    .catch((err) => res.render(err))
})
  

//Delete Card from My Deck of Cards (Requires User authentication + User ID / Card Owner matching).
router.post('/my-deck-of-cards/:id/delete', checkForAuthentication, (req, res, next) => {
    
    const id = req.params.id
    
    Card
    .findByIdAndDelete(id)
    .then(result => {
                if(result.owner.toString() == req.user._id.toString()){
                console.log(result)
                res.redirect('/cards/my-deck-of-cards')
            } else {
        res.redirect('/login')}
    })

    .catch((error)=>{
        console.log(error)
        next(error)
    })
})


//Edite Card into My Deck of Cards (Requires User authentication + User ID / Card Owner matching).
router.get('/my-deck-of-cards/details/:id/edit', checkForAuthentication, (req, res, next) => {

    const id = req.params.id
    
    Card
    .findById(id)
    .then(card => {
        if(card.owner.toString() == req.user._id.toString()){
        res.render('cards/edit', card)
    } else {
        res.redirect('/login')}
    })
    
    .catch((error)=>{
        console.log(error)
        next(error)
    })
})

router.post('/:id/', (req, res, next) => {
    
    const id = req.params.id
    const updatedCard = req.body
    
        Card
        .findById(id)
        .then(card => {
            if(card.owner.toString() == req.user._id.toString()){
                Card
                .findByIdAndUpdate(id, updatedCard)
                .then(result => {
                    console.log(result)
                    res.redirect(`/cards/my-deck-of-cards/details/${id}`)
                })
            } else {
            res.redirect('/login')}
        })
        
        .catch((error)=>{
            console.log(error)
            next(error)
        })
})


module.exports = router;