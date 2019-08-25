'use strict';

require('dotenv').config();

const config = {
	app: {
		port: parseInt(process.env.PORT) || 80,
		secret: process.env.SECRET || 'better',
		type: process.env.NODE_ENV
	},
	cloudinary: {
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.API_KEY,
		api_secret: process.env.API_SECRET
	},
	mongo: {
		productionUri: process.env.MONGO_URI_PRODUCTION,
		testUri: process.env.MONGO_URI_DEV
	}
};

module.exports = config;
