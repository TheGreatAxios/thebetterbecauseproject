'use strict';

// Require Mongoose
const mongoose = require('mongoose');
let Schema = mongoose.Schema; // Schema Definition
let ObjectId = Schema.ObjectId; // Use Unique ObjectId

// Create the story schema (This will be expanded upon ASAP)
let storySchema = Schema({
	name: String,
	anonymous: Boolean,
	email: String,
	story: String,
	notes: String,
	published: Boolean,
	image: {
		url: { type: String, default: 'http://res.cloudinary.com/fleur-technologies/image/upload/v1558410876/betterImages/default.jpg' }, // Default User Image if one isn't selected
		id: { type: String, default: 'betterImages/defaulthttp://res.cloudinary.com/fleur-technologies/image/upload/v1558410876/betterImages/default.jpg' },
	},
    date: { type: Date, default: Date.now },
    release: Boolean,
    country: String,
}, { collection: 'stories' }); // Defines the Collection

module.exports = storySchema;