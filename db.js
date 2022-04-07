const mongoose = require('mongoose');


const ElementSchema = new mongoose.Schema({
    name: String,
    color: String,
    dmg: Number,
    firerate: Number,
    projectileSize: Number,
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

//Base Element Collection:
const Element = mongoose.model('Element');
const test = Element.find({name:'fire'}, (err, docs) =>{
    if(docs.length === 0 ){
        const fire = new Element({
            name: 'fire',
            color: 'orange',
            dmg: 4,
            firerate: 5,
            projectileSize: 3.8,
            combos: []
        
        });
        const water = new Element({
            name: 'water',
            color: 'blue',
            dmg: 6,
            firerate: 3,
            projectileSize: 6,
            combos: []
            
        });
        const air = new Element({
            name: 'air',
            color: 'whitesmoke',
            dmg: 2,
            firerate: 8,
            projectileSize: 2,
            combos: []
            
        });
        const earth = new Element({
            name: 'earth',
            color: 'brown',
            dmg: 10,
            firerate: 1,
            projectileSize: 8.5,
            combos: []
            
        });
        
        fire.save();
        water.save();
        air.save();
        earth.save();
   }
});





/*
fire.save((err, element) =>{
    water.save((err, element) =>{
        air.save((err, element) =>{
            earth.save((err, element) =>{
                
            });
        });
    });
});
*/



mongoose.connect('mongodb+srv://Tosin-Adesina:spider3474@cluster0.vzrl0.mongodb.net/elementdb?retryWrites=true&w=majority' || 'mongodb://localhost/elementdb', (err) => {
    if(err){
        console.log('Oh no Tosin, an error ocuured!');
        console.log(err);
        console.log(process.env.MONGODB_URL);
    }
    else{
        console.log('Connected to Tosin\'s elementdb')
    }
});
