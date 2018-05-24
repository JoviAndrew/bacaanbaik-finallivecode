const mongoose = require('mongoose');
const Schema = mongoose.Schema

let bookSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    image: String,
    title: String,
    author: String,
    publisher: String,
    description: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }]
}, {
    timestamps: true
})

let book = mongoose.model('book', bookSchema);

module.exports = book;