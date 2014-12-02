var Todo = require('./models/todo');
var request = require('request');

module.exports = function(app) {
  console.log('load routes...');
	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {
    console.log('get todos...');

		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			title : req.body.title,
			body : req.body.body,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	app.post('/proxyJSON', function(req, res) {
    console.log('targetUrl: '+req.body.targetUrl);
    
    request({
      url: req.body.targetUrl,
      json: true
      }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(body);
      } else {
        res.json({proxyError:error});
      }
      res.end();
    });

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
    console.log('send index...');
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
