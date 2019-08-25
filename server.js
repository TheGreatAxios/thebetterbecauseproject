'use strict';

const app = require('./app');

// Config
const config = require('./app/config/config');

let port = config.app.port;
app.listen(port, (err) => {
	if (err) {
		console.log(err);
		return server.status(0);
	} else {
		console.log('Server Running on Port ' + port);
	}
});