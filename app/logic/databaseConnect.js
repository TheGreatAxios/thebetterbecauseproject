'use strict';

const mongoose = require('mongoose'); // MongoDB ORM Package
const config = require('../config/config'); // Get Config Variables
let db; // Init DB Variable

/* 

Checks if Production or Development
If you set the NODE_ENV to production, the code will not automatically work
with the production database
*/
if (config.app.type == 'production') {
	db = config.mongo.productionUri;
} else {
	db = config.mongo.testUri;
	console.log(db);
}
// Connect to MongoDB and Mongoose (min 5.x.x)
mongoose.connect(db, { useNewUrlParser: true }, (err, database) => {
		if (err) {
			// Remove and Add Server Status 500
			console.log(err);
		} else {
			let storiesDB = database.collection.stories;
			console.log('Connected Successfully'); // Remove In Production
	}
});

// Exports Mongoose, this is called in all files that require a database connection
module.exports = mongoose;

