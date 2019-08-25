'use strict';

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

const app = module.exports = express(); // Initialize App


/* APP SETUP */
app.locals.moment = require('moment');
app.use(logger('dev')); // LOGGER IN DEV

app.use(bodyParser.json()); // ACCEPT JSON DATA
app.use(bodyParser.urlencoded({ extended: false }));

// VIEW ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './app/views'));

// Sass
app.use(sass({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public')
}));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));
require('./app/index')(app);

//Compression
app.use(compression());



app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send('Server Error');
});
sitemap.generate(app);
module.exports = app;