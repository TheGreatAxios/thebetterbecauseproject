'use strict';

// Basic Server, Secruity, Logging, and Data Packages
const express = require('express'); // Server
const sitemap = require('express-sitemap')();
const compression = require('compression'); // Gzip Compression
const path = require('path'); // Path/Movement Between Dir's
const logger = require('morgan'); // Logger
const bodyParser = require('body-parser'); // Parsing Express Data
const helmet = require('helmet'); // Security
const cors = require('cors'); // Security
const favicon = require('serve-favicon'); // Favicon

// Gulp Setup (SCSS/SASS)
const sass = require('node-sass-middleware');

sass.compiler = require('node-sass');

// Config
const config = require('./app/config/config');

// Initialize App
const app = module.exports = express(); 

/* APP SETUP */
app.use(logger('dev')); // LOGGER IN DEV

app.use(bodyParser.json()); // Utlize JSON data
app.use(bodyParser.urlencoded({ extended: false }));

// VIEW ENGINE (PugJs)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './app/views')); // Will be separating views into client and admin

// Sass (We would like to separate SCSS and CSS files into two different folders)
app.use(sass({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public')
}));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Require the App, this will also get split into client and admin
require('./app/index')(app);

//Compression
app.use(compression());

// Basic Error Handler (Can Be Imrpoved Upon)
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send('Server Error');
});

// Generate Sitemap
sitemap.generate(app);

// Export App to be called in ./app/index.js
module.exports = app;