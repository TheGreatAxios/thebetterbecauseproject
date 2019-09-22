'use strict';
// The Main ROUTER of the app

/* This will get separated into two different index.js files
that will be placed inside admin and client instead of at the app level */
module.exports = (app) => {
	// Client (These will change to index instead of controller)
	let index = require('./client/components/index/controller');
	let about = require('./client/components/about/controller');
	let legal = require('./client/components/legal/controller');
	let stories = require('./client/components/stories/controller');
	let oauth = require('./client/components/oauth2/controller');
	let shareStory = require('./client/components/share-story/controller');
	// The array of routes
	/*

	Thoughts on if app.use('/', index); shoudl be utlized for each route or if the array is better
	not sure if there is a bad amount of overhead because of this

	*/
	let routes = [index, about, stories, legal, oauth, shareStory];
	// Admin
	let dashboard = require('./admin/components/dashboard/controller');
	let adminStories = require('./admin/components/stories/controller');
	let admin = [dashboard, adminStories];
	app.use('/', routes);
	app.use('/', admin);

}
