'use strict';
const content = require('./content');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config');
// Database
let mongoose = require('../../../logic/databaseConnect');
let storySchema = require('../../../models/story');
let Story = mongoose.model('Story', storySchema);

// Image Save Dep
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

router.get('/', (req, res) => {
	res.render('index', {
		content: content
	});
});

// Setup Image Saving
cloudinary.config({
	cloud_name: config.cloudinary.cloud_name,
	api_key: config.cloudinary.api_key,
	api_secret: config.cloudinary.api_secret
});

const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: 'betterImages',
	allowedFormats: ['jpg', 'png'],
	transformation: [{ dpr: "auto", responsive: true, width: "auto", crop: "scale"}]
});

const parser = multer({ storage: storage });

router.post('/addpost', parser.single('imageUpload'), (req, res) => {
	let story = {};
	let imageUpload = req.body.imageUpload;
	let imageDefault = req.body.imageDefault;
	let image = {};
	image.url = req.file.url;
	image.id = req.file.public_id;
	story.image = image;
	// Story Object
	story.name = req.body.name;
	story.anonymous= req.body.anonymous || false;
	story.email = req.body.email;
	story.story = req.body.story;
	story.notes = req.body.notes;
	story.published = false;
	story.release = true;
	console.log(story);
	let storyData = new Story(story);
	storyData.save().then(result => {
		console.log('Story Saved');
		res.redirect('/');
	}).catch(err => {
		console.log(err);
		res.status(400).send("unable to save story");
	});
});
module.exports = router;