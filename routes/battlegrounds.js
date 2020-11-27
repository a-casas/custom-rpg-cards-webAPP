const express = require('express');
const router = express.Router();


//Battlegrounds map
router.get('/', (req, res, next) => res.render('battlegrounds/index', {url: `https://maps.googleapis.com/maps/api/js?key=${process.env.KEY}`}))
 
module.exports = router;