const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let storySchema = Schema({
	name: String,
	anonymous: Boolean,
	email: String,
	story: String,
	notes: String,
	published: Boolean,
	image: {
		url: { type: String, default: 'http://res.cloudinary.com/fleur-technologies/image/upload/v1558410876/betterImages/default.jpg' },
		id: { type: String, default: 'betterImages/defaulthttp://res.cloudinary.com/fleur-technologies/image/upload/v1558410876/betterImages/default.jpg' },
	},
    date: { type: Date, default: Date.now },
    release: Boolean,
    country: String,
}, { collection: 'stories' });

module.exports = storySchema;