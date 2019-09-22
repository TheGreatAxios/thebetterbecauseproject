'use strict';
const content = require('./content');
const express = require('express');
const router = express.Router();

router.get('/share-story', (req, res) => {
	res.render('share-story', {
		content: content
	});
});

module.exports = router;
