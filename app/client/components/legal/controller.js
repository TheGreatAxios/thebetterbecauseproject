'use strict';

const content = require('./content');
const express = require('express');
const router = express.Router();

router.get('/terms-and-conditions', (req, res) => {
	res.render('terms', {
		content: content
	});
});

router.get('/privacy-policy', (req, res) => {
	res.render('privacy', {
		content: content
	});
});

module.exports = router;