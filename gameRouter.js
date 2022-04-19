const express = require('express');
const mongoose = require('mongoose');
const Element = mongoose.model('Element');
const Player = mongoose.model('Player');
const router = express.Router();
router.get('/playgame', (req, res) => {
    Element.find({}, (err, docs) => {
        res.render('playgame', {elements: docs});
    });
    
});



router.get('/instructions', (req, res) => {
    const search = {};
    if(req.query.name !== '' && req.query.hasOwnProperty('name')){
        search.name = req.query.name;
    }
    if(req.query.color !== '' && req.query.hasOwnProperty('color')){
        search.color = req.query.color;
    }
    if(req.query.dmg !== '' && req.query.hasOwnProperty('dmg')){
        search.dmg = req.query.dmg;
    }
    if(req.query.firerate !== '' && req.query.hasOwnProperty('firerate')){
        search.firerate = req.query.firerate;
    }
    if(req.query.speed !== '' && req.query.hasOwnProperty('speed')){
        search.speed = req.query.speed;
    }
    if(req.query.projectileSize !== '' && req.query.hasOwnProperty('projectileSize')){
        search.projectileSize = req.query.projectileSize;
    }

    Element.find(search, (err, docs) => {
        res.render('instructions', {elements: docs});
    });
});

router.post('/instructions', (req,res) =>{
    const e = new Element({
        name: req.body.name,
        color: req.body.color,
        dmg: req.body.dmg,
        firerate: req.body.firerate,
        projectileSize: req.body.projectileSize,
        speed: req.body.speed,
        combos: []
    });
    e.save((err,element) =>{
        res.redirect('/game/instructions');
    });
    
})

router.get('/leaderboard', (req, res) => {
    Player.find({}, (err, docs) => {
        res.render('leaderboard', {players: docs});
    });
    
})

let currentPlayerID = 1;
router.post('/leaderboard', (req,res) =>{
    const p = new Player({
        playerid: currentPlayerID,
        name: req.body.playername,
        score: req.body.score
    });
    p.save((err,player) =>{
        currentPlayerID+=1;
        res.redirect('/game/leaderboard');
    });
    
})




module.exports = router;