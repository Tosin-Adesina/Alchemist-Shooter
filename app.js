const { urlencoded } = require('body-parser');
const express = require('express');
const path = require('path');
require('./db.js') ;
const app = express();
app.set('view engine', 'hbs');

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', function(req, res, next){
    console.log('Connected!');
    next();
});

app.get('/', (req, res) => {

    res.render('titlescreen');
});

const gameRouter = require('./gameRouter')
app.use('/game', gameRouter);
app.listen(process.env.PORT || 3000);
console.log('Server started!');