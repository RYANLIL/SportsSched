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
	var query = {userID: username};
	console.log('models');
	Student.find(query, callback);
}