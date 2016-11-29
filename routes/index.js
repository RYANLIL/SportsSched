var express = require('express');
var router = express.Router();
var Student = require('../models/student');


// Get Dashboard
router.get('/', ensureAuth, function(req, res){
	res.render('index');
});
//retreving users students
router.get('/get', function(req,res){
	var username = req.user.username;
	Student.getStudentsByUser(username,function(err,students){
		res.send(students);		
	});
});
//deleting student 
router.post('/delete',  function(req, res){
	console.log(req.body.id);
	Student.deleteStudentsByID(req.body.id);
	res.send('Student Deleted');
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