const async = require('hbs/lib/async');
const mongoose = require('mongoose');


const ElementSchema = new mongoose.Schema({
    name: String,
    color: String,
    dmg: Number,
    firerate: Number,
    projectileSize: Number,
    speed: Number,
    combos: [{type: mongoose.Schema.Types.ObjectId, ref: 'ComboSchema'}],
});

const PlayerSchema = new mongoose.Schema({
    playerid: String,
    name: String,
    score: Number
})

//The last attrivute of an element, "combos" is a list of elements that
// the element can combine with to form new elements. "second_element"
// is the second element being combined and "combo_name" is the name of
// the resulting element which itself has an entry in the element table
const ComboSchema = new mongoose.Schema({
    second_element: String,
    combo_name: String
})

mongoose.model('Element', ElementSchema);
mongoose.model('Combo', ComboSchema);
mongoose.model('Player', PlayerSchema);

const Element = mongoose.model('Element');
const Player = mongoose.model('Player');
if(!(process.env.MONGODB_URI)){
    //Base Element Collection:
    async function propogateDatabase(){
        //await Player.deleteMany({}).exec();

        const docs = await Element.find({name:'fire'});
        if(docs.length === 0 ){
            const fire = new Element({
                name: 'fire',
                color: 'orange',
                dmg: 4,
                firerate: 5,
                projectileSize: 3.8,
                speed: 5,
                combos: []
            
            });
            const water = new Element({
                name: 'water',
                color: 'blue',
                dmg: 6,
                firerate: 3,
                projectileSize: 6,
                speed: 3,
                combos: []
                
            });
            const air = new Element({
                name: 'air',
                color: 'whitesmoke',
                dmg: 2,
                firerate: 8,
                projectileSize: 2,
                speed: 8,
                combos: []
                
            });
            const earth = new Element({
                name: 'earth',
                color: 'saddlebrown',
                dmg: 10,
                firerate: 5,
                projectileSize: 8.5,
                speed: 2,
                combos: []
                
            });
            
            fire.save();
            water.save();
            air.save();
            earth.save();
        }
    }

    propogateDatabase();
}



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/elementdb', (err) => {
    if(err){
        console.log('Oh no Tosin, an error ocuured!');
        console.log(err);
        console.log(process.env.MONGODB_URI);
    }
    else{
        console.log('Connected to Tosin\'s elementdb')
    }
});
