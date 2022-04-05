const mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs'),
  passportLocalMongoose = require('passport-local-mongoose');


const Player = new mongoose.Schema({
  // username, password
  lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});

const Element = new mongoose.Schema({
	name: {type: String, required: true},
	dmg: {type: Number, min: 1, required: true},
	firerate: {type: Number, min: 1, required: true}
}, {
	_id: true
});


const List = new mongoose.Schema({
  player: {type: mongoose.Schema.Types.ObjectId, ref:'Player'},
  name: {type: String, required: true},
	createdAt: {type: Date, required: true},
	elements: [Element]
});


Player.plugin(passportLocalMongoose);
List.plugin(URLSlugs('name'));

mongoose.model('Player', Player);
mongoose.model('List', List);
mongoose.model('Element', Element);
mongoose.connect('mongodb://localhost/alchemistdb');
