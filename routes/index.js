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

router.post('/save', function(req,res){
	console.log(req.user.username);

	var obj = JSON.parse(req.body.students);

	for (var i = 0; i < obj.length; i++) {
		var studentId = obj[i].studentId;
		var firstName = obj[i].firstName;
		var lastName = obj[i].lastName;
		var repository = obj[i].repository;
		var obID = obj[i].obID;

		if('obID' in obj[i]){
			var newStudent = {
				sid: studentId,
				fname: firstName,
				lname: lastName,
				repo: repository,
				username: req.user.username
			}
			console.log('obid::' + obID)
			Student.updateStudentById(obID, newStudent);
		}
		else{
			var newStudent = new Student({
				sid: studentId,
				fname: firstName,
				lname: lastName,
				repo: repository,
				username: req.user.username
			})
			Student.createStudent(newStudent);
		}

		// if('obID' in obj)
		// 	Student.updateStudentById(obID, newStudent);
		// else
		// 	Student.createStudent(newStudent);
	
	};
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