var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


//User Schema
var StudentSchema = mongoose.Schema({
	sid: {
		type: String,
	},
	fname: {
		type: String
	},
	lname: {
		type: String
	},
	repo: {
		type: String
	},
	username: {
		type: String
	}
});

var Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.getStudentsByUser = function(username, callback){
	var query = {username: username};
	Student.find(query, callback);
}

module.exports.deleteStudentsByID = function(id){
	var query = {_id:id};

	Student.findByIdAndRemove(id).exec();	
}

module.exports.createStudent = function(newStudent){
	newStudent.save();
}

module.exports.updateStudentById = function(id, student){
	var query = {'_id':id};

	Student.findOneAndUpdate(query, student, function(err, doc){
		    if (err) 
		    	console.log(err);
		    else
		    	console.log("succesfully saved");
		});
	//Student.findOneAndUpdate(id, student,{upsert:true}).exec();;

	// Student.findById(id, function(err, doc) {
	//     if (err) {
	//       console.error('error, no entry found');
	//     }
	//     doc.sid = student.sid;
	//     doc.fname = student.fname;
	//     doc.lname = student.lname;
	//     doc.repo = student.repo;
	//     doc.username = student.username;
	//     doc.save();
	//   });
}