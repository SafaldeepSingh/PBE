const mongoose = require('mongoose')

const Question = mongoose.model('Question', {
    id: Number,
    annotations: [String] //Array of Strings
}, 'Questions');

module.exports = {Question: Question}