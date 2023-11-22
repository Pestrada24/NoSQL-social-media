const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/thought_bubble_db');

module.exports = mongoose.connection;