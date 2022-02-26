const mongoose = require('mongoose')

const Topic = mongoose.model('Topic', {
    name: String,
    parents: [String] //Array of Strings
}, 'Topics');

module.exports = {Topic: Topic}