var Todo = require('./models/todo');
var Gamertag = require('./models/gamertag');
var request = require('request');
var Destiny = require('destiny-client')(/* { host: 'http://localhost:9000' } */);

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

	app.get('/api/gamertags', function(req, res) {
    console.log('get gamertags...');

		// use mongoose to get all todos in the database
		Gamertag.find(function(err, gamertags) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(gamertags); // return all todos in JSON format
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

	app.post('/api/gamertags', function(req, res) {

		// create a gamertag, information comes from AJAX request from Angular
		Gamertag.create({
			name : req.body.name,
			account : req.body.account,
			done : false
		}, function(err, gamertag) {
			if (err)
				res.send(err);

			// get and return all the gamertags after creating another
			Gamertag.find(function(err, gamertags) {
				if (err)
					res.send(err)
				res.json(gamertags);
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

	app.get('/destinyINVENTORY/:id/:membershipId', function(req, response) {
    var membershipId = req.params.membershipId,
                  id = req.params.id;
    Destiny
      .character.inventory({ type: 2, membership: membershipId, id: id, query: {definitions: true} })
      .end(function (err, res) {
        response.send(res.text);
      });
	});

	app.get('/destinyACTIVITIES/:id/:membershipId', function(req, response) {
    var membershipId = req.params.membershipId,
                  id = req.params.id;
    Destiny
      .character.activities({ type: 2, membership: membershipId, id: id, query: {definitions: true} })
      .end(function (err, res) {
        response.send(res.text);
      });
	});

	app.get('/destinyPROGRESSION/:id/:membershipId', function(req, response) {
    var membershipId = req.params.membershipId,
                  id = req.params.id;
    Destiny
      .character.progression({ type: 2, membership: membershipId, id: id, query: {definitions: true} })
      .end(function (err, res) {
        response.send(res.text);
      });
	});
/*
	app.get('/destinyACTIVITIES', function(req, response) {
    Destiny
      .character.inventory({ type: 2, membership: '4611686018428410896', id: '2305843009215383036', query: {descriptions: true} })
      .end(function (err, res) {
        response.send(res.text);
      });
	});
*/
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

	app.delete('/api/gamertags/:gamertag_id', function(req, res) {
		Gamertag.remove({
			_id : req.params.gamertag_id
		}, function(err, gamertag) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Gamertag.find(function(err, gamertags) {
				if (err)
					res.send(err)
				res.json(gamertags);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
    console.log('send index...');
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
