'use strict';

module.exports = (app) => {
	// Client
	let index = require('./client/components/index/controller');
	let about = require('./client/components/about/controller');
	let legal = require('./client/components/legal/controller');
	let stories = require('./client/components/stories/controller');
	let routes = [index, about, stories, legal];
	// Admin
	let dashboard = require('./admin/components/dashboard/controller');
	let adminStories = require('./admin/components/stories/controller');
	let admin = [dashboard, adminStories];
	app.use('/', routes);
	app.use('/', admin);

}