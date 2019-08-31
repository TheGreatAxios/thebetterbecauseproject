'use strict';

const app = require('./app'); // Require the app.js file in Root

// Config
const config = require('./app/config/config'); // Require Basic Config for PORT

let port = config.app.port; // Init Port
app.listen(port, (err) => { // Express Version of Server Create
	if (err) {
		console.log(err); // Can remove for production
		return server.status(0);
	} else {
		console.log('Server Running on Port ' + port); // Can remove for production
	}
});