const express = require('express');
const router = express.Router();
const passport = require('passport');
let Strategy = require('passport-local').Strategy;
let db = require('./../db');


passport.use(new Strategy((username, password, cb) => {
	db.users.findByUsername(username, (err, user) => {
		if (err) {
			return cb(err);
		} else if (!user) { return cb(null, false);
		} else if (user.password != password) {
			return cb(null, false);
		}
			return cb(null, user);
	});
}));

passport.serializeUser((user, cb) => {
	cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
	db.users.findById(id, (err, user) => {
		if (err) {
			return cb(err);
		}
		cb(null, user);
	});
});
router.use(require('cookie-parser')());
router.use(require('body-parser').urlencoded({ extended: true }));
router.use(require('express-session')({ secret: 'fleur', resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());



router.get('/admin/login', (req, res) => {
	res.render('adminViews/login');
});

router.get('/admin/profile', require('connect-ensure-login').ensureLoggedIn('/admin/login'), (req, res) => {
	res.render('adminViews/profile', {
		user: req.user
	});
});

router.post('/admin/login', passport.authenticate('local'), (req, res) => {
	res.render('adminViews/profile', {
		user: req.user.displayName
	})

});

router.get('/admin/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;