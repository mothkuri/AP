
/*
 * GET home page.
 */
var Student = require('../models/student');

exports.index = function(req, res){
	var student = new Student({_id:2,name:'shiva',location:'Bengaluru'});
	student.save(function(err){
		if(err){
			res.send(err);	
		}
		else{
			res.send('ok');
		}
	});
 // res.render('index', { title: 'Express' });
};

