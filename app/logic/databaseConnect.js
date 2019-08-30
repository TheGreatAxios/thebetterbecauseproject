'use strict';

const mongoose = require('mongoose');
const config = require('../config/config');
let db;

if (config.app.type == 'production') {
	db = config.mongo.productionUri;
} else {
	db = config.mongo.testUri;
	console.log(db);
}

mongoose.connect(db, { useNewUrlParser: true }, (err, database) => {
		if (err) {
			console.log(err);
		} else {
			let storiesDB = database.collection.stories;
			console.log('Connected Successfully');
	}
});

module.exports = mongoose;

