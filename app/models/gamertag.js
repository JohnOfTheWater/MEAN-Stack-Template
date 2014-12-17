var mongoose = require('mongoose');

module.exports = mongoose.model('Gamertag', {

	name: { type : String, default: '' },
	account: { type : String, default: 'TigerPSN' },
	date: { type: Date, default: Date.now }

});
