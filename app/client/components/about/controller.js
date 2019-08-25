'use strict';

const content = require('./content');
const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
	res.render('about', {
		content: content
	});
});

module.exports = router;