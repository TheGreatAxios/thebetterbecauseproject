const express = require('express');
const router = express.Router();

let content = require('./content');
let mongoose = require('../../../logic/databaseConnect');
let storySchema = require('../../../models/story');
let Story = mongoose.model('Story', storySchema);

router.get('/stories', (req, res) => {
	let body = req.body;
	Story.find({ published: true }, (err, stories) => {
		res.render('stories', {
			content: content,
			stories: stories
		});
	});
});

router.get('/stories/:id', (req, res) => {
	Story.findById(req.params.id, (err, story) => {
		if (err) { console.log(err); return err; }
		res.render('story', {
			content: content,
			story: story
		});
	});
});

module.exports = router;