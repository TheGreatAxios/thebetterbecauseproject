const express = require('express');
const router = express.Router();
const config = require('../../../config/config');
let db = require('./../db');

// Connect to Database
let mongoose = require('../../../logic/databaseConnect');
let storySchema = require('../../../models/story');
let Story = mongoose.model('Story', storySchema);

// Image Save Dependencies
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');



router.get('/admin/stories', require('connect-ensure-login').ensureLoggedIn('/admin/login'), (req, res) => {
	Story.find({}, (err, stories) => {
		res.render('adminViews/stories', {
			stories: stories
		});
	});
});

router.get('/admin/stories/:id', require('connect-ensure-login').ensureLoggedIn('/admin/login'), (req, res) => {
	Story.findById(req.params.id, (err, story) => {
		if (err) { console.log(err); return err; }
		res.render('adminViews/story', {
			id: story.id,
			name: story.name,
			story: story.story,
			anonymous: story.anonymous,
			email: story.email,
			published: story.published,
			notes: story.notes,
			image: story.image.url
		});
	});
});
router.post('/admin/stories/delete', (req, res) => {
	let id = req.body.storyId || req.query.id;
	Story.findOneAndDelete({ _id: storyId}, (err, res) => {
		if (err) { console.log(err); return err; }
		res.json({success: true});
	})
})
router.get('/admin/stories/edit/:id', require('connect-ensure-login').ensureLoggedIn('/admin/login'), (req, res) => {
	var id = req.query.id;
	Story.findById(req.params.id, (err, story) => {
		if (err) { console.log(err); return err; }
		res.render('adminViews/editStory', {
			id: story.id,
			name: story.name,
			story: story.story,
			notes: story.notes,
			image: story.image.url,
			anonymous: story.anonymous,
			email: story.email,
			published: story.published
		});
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
	transformation: [{ width: 400, height: 300, crop: 'scale' }, {dpr: '3.0'}]
});

const parser = multer({ storage: storage });
router.post('/admin/stories/edit', parser.single('imageUpload'), (req, res) => {
	let body = req.body;
	let image = req.body.image;
	let id = body.storyid;
	Story.findOne({ _id: id}, (err, story) => {
		if (err) {
			return res.send(err);
		} else {
			/*// Section not Workings
			let imageUpload = req.body.imageUpload;
			let imageDefault = req.body.imageDefault;
			if (imageUpload === true) {
				let image = {};
				image.url = req.file.url;
				image.id = req.file.public_id;
				story.image = image;
				console.log(story.image);
			} else if (imageDefault === true) {
				let image = {};
				image.url = 'http://res.cloudinary.com/fleur-technologies/image/upload/betterImages/default';
				image.id = 'betterImages/default';
				story.image = image;
				console.log(story.image);
			} else {
				story.image.url = body.image;
				console.log(story.image.url);
			}*/
			story.name = body.name;
			story.story  = body.story;
			story.notes = body.notes;
			story.anonymous = body.anonymous;
			story.published = body.published;
			story.email =  story.email;
			story.image = story.image;
			story.release = story.release;
			story.save(function(err) {
				if(!err) {
					console.log('updated.');
				}
				else {
					console.log(err);
				}
				return res.redirect('/admin/stories/' + story.id);
			});
			
		}
	});
});

module.exports = router;

