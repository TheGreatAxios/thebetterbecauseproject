'use strict';
// Requires Environmetnal Variables
require('dotenv').config();

// Config Values for Admin Users
const config = {
	dev: {
		password: 'thebetterbecauseproject',
		username: 'dev',
		displayName: 'BBP Dev',
		email: 'general@bbp.com'
	},
	admin: {
		username: process.env.ADMIN_USER,
		password: process.env.ADMIN_PASS,
		displayName: 'BBP Admin',
		email: process.env.ADMIN_EMAIL
	},
	axios: {
		username: process.env.AXIOS_USER,
		password: process.env.AXIOS_PASS,
		displayName: 'Mr. Axios',
		email: process.env.AXIOS_EMAIL
	}
};

module.exports = config;