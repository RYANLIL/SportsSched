var express = require('express');
var router = express.Router();


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//getting user model (db functions for user)
var User = require('../models/user');

// Register
router.get('/register',  function(req, res){
	res.render('register');
});

// Login
router.get('/login',  function(req, res){
	res.render('login');
});

// Register User
router.post('/register',  function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var uname = req.body.username;
	var pword = req.body.password;
	var pword2 = req.body.password2;
	uname = uname.replace(/\s+/g, '').toLowerCase();



	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(pword);

	var errors = req.validationErrors();

	if(uname){
		User.getUserByUsername(uname, function(err, user){
		   	if(err) throw err;
		   	console.log('user::'+user);
		   	if(user){
			   	if(user.username == uname ){
			   		errors = [ { param: 'username', msg: 'Username USED', value: '' } ];
			   	}
			}

		   	if(errors){
				res.render('register',{
					errors:errors
				});
			}else
			{
				var newUser = new User({
					name: name,
					email:email,
					username: uname,
					password: pword
				});

				User.createUser(newUser, function(err, user){
					if(err) throw err;
					console.log(user);
				});

				req.flash('success_msg', 'You are registered and can now login');

				res.redirect('/users/login');
			}
	   });
	}else
	{
		res.render('register',{
					errors:errors
				});
	}
	

});

passport.use(new LocalStrategy(
  function(username, password, done) {
	username = username.replace(/\s+/g, '').toLowerCase();

   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'User does not exist'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }
 ));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'Logged out');

	res.redirect('/users/login');
});


module.exports = router;