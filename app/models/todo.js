var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {

	title: { type : String, default: '' },
	body: { type : String, default: '' },
	date: { type: Date, default: Date.now }

});