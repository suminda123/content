var keystone = require('keystone');
var async = require('async');
var Home = keystone.list('Home');
var HappyClients = keystone.list('HappyClients');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);

	var locals = res.locals;
	locals.section = 'home';
	locals.section = 'happyClients';

	// Load the current post
	view.on('init', function (next) {

		var q = Home.model.findOne({
			state: 'published'
		});

		q.exec(function (err, result) {
			if (!result)
				result=new Home.model();

			locals.home = result;
			next(err);
		});

	});

	// Load the current post
	view.on('init', function (next) {

		var q = HappyClients.model.find();

		q.exec(function (err, result) {
			locals.happyClients = result;
			console.log(result);
			next(err);
		});

	});

	// Load the happy clients
	//view.query('happyClients', HappyClients.model.find());


	view.render('index');
}
