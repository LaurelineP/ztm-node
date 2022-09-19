const mongoose = require('mongoose');

const planetsSchema = new mongoose.Schema({
	kepler_name: {
		required: true,
		type: String,
	}
})

module.exports = mongoose.model('Planet', planetsSchema ); // returns an Model Object