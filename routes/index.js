var express = require('express');
var router = express.Router();
var Student = require('../models/student');


// Get Dashboard
router.get('/', ensureAuth, function(req, res){
	var username = req.user.username;
	console.log('username::' + username );
	Student.getStudentsByUser(username,function(err,students){
		console.log(students);
	});
	res.render('index');
});



router.post('/',  function(req, res){
	console.log(req.body);
});

function ensureAuth(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','Not logged in');
		res.redirect('/users/login');
	}
}
module.exports = router;