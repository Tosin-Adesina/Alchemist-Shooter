const express = require('express');
const mongoose = require('mongoose');
const Element = mongoose.model('Element');
const Player = mongoose.model('Player');
const router = express.Router();
router.get('/playgame', (req, res) => {
    res.render('playgame');
});


router.get('/instructions', (req, res) => {
    Element.find({}, (err, docs) => {
        res.render('instructions', {elements: docs});
    });
});

router.get('/leaderboard', (req, res) => {
    Player.find({}, (err, docs) => {
        res.render('leaderboard', {players: docs});
    })
    
})

let currentPlayerID = 1;
router.post('/leaderboard', (req,res) =>{
    const p = new Player({
        playerid: currentPlayerID,
        name: req.body.playername,
        score: req.body.score
    });
    p.save((err,player) =>{
        console.log('name is ');
        console.log(req.body.playername);
        currentPlayerID+=1;
        res.redirect('/game/leaderboard');
    });
    
})




module.exports = router;