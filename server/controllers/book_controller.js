const book = require('../models/book_model')
const comment = require('../models/comment_model')
const user = require('../models/user_model')
const jwt = require('jsonwebtoken')

module.exports = {
  getAllBooks (req, res) {
    book.find({})
      .then(function (bookData) {
        res.status(200).json({
          message: 'Success get book data',
          data: bookData
        })
      })
      .catch(function (err) {
        res.status(500).json({
          message: err.message,
          err
        })
      })
  },
  addBook (req, res) {
    const token = req.headers.token
		jwt.verify(token, process.env.SECRET, function(err, result){
			if (err) {
        res.send({
            err: err,
            message: err.message
        })
			}
			else {
        book.create({
          user: result.id,
          image: req.file.cloudStoragePublicUrl,
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          publisher: req.body.publisher,
          comments: [],
          likes: []
        })
        .then(function (response) {
          res.status(201).json({
            message: 'Successfully added a new book',
            response
          })
        })
        .catch(function (err) {
          res.status(400).json({
            message: err.message,
            err
          })
        })
      }
    })
  },
  getOneBook (req, res) {
    let id = req.params.id
    book.findById({
      _id: id
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'user'
      }
    })
    .populate('user')
    .exec()
    .then(function (bookData) {
      res.status(200).json({
        message: 'Success get book detail',
        bookData
      })
    })
    .catch(function (err) {
      res.status(400).json({
        message: err.message,
        err
      })
    })
  },
  addComment (req, res) {
    const token = req.headers.token
    const id = req.params.id
		jwt.verify(token, process.env.SECRET, function(err, result){
			if (err) {
        res.send({
          err: err,
          message: err.message
        })
			}
			else {
        comment.create({
          user: result.id,
          comment: req.body.comment,
          bookId: id
        })
        .then(function (response) {
          book.bulkWrite([{
            updateOne: {
              filter: { '_id': id },
              update: { $push: { comments: response._id}}
            }
          }])
            .then(function (response) {
              res.status(201).json({
                message: 'Successfully added a comment',
                response
              })
            })
            .catch(function (err) {
              res.status(400).json({
                message: err.message,
                err
              })
            })
        })
        .catch(function (err) {
          res.status(400).json({
            message: err.message,
            err
          })
        })
      }
    })
  },
  searchBook (req, res) {
    book.find({
      title: req.params.title
    })
    .then(function (bookData) {
      if (bookData.length === 0) {
        res.status(400).json({
          message: 'sorry the book you are looking for cannot be found!'
        })
      } else {
        res.status(200).json({
          message: 'Successfully found books',
          bookData
        })
      }
    })
    .catch(function (err) {
      res.status(400).json({
        message: err.message,
        err
      })
    })
  },
  likeBook (req, res) {
    const token = req.headers.token
    let bookId = req.params.id
    jwt.verify(token, process.env.SECRET, function(err, result){
			if (err) {
        res.send({
          err: err,
          message: err.message
        })
			}
			else {
        book.bulkWrite([{
          updateOne: {
            filter: { '_id': bookId },
            update: { $addToSet: { likes: result.id}}
          }
        }])
        .then(function (response) {
          res.status(201).json({
            message: 'Successfully like a book',
            response
          })
        })
        .catch(function (err) {
          res.status(400).json({
            message: err.message,
            err
          })
        })
      }
    })
  },
  unlikeBook (req, res) {
    const token = req.headers.token
    let bookId = req.params.id
    jwt.verify(token, process.env.SECRET, function(err, result){
			if (err) {
        res.send({
          err: err,
          message: err.message
        })
			}
			else {
        book.bulkWrite([{
          updateOne: {
            filter: { '_id': bookId },
            update: { $pull: { likes: result.id}}
          }
        }])
        .then(function (response) {
          res.status(201).json({
            message: 'Successfully dislike a book',
            response
          })
        })
        .catch(function (err) {
          res.status(400).json({
            message: err.message,
            err
          })
        })
      }
    })
  },
  deleteBook (req, res) {
    let id = req.params.id
    const token = req.headers.token
    jwt.verify(token, process.env.SECRET, function(err, result){
			if (err) {
        res.send({
          err: err,
          message: err.message
        })
			}
			else {
        book.deleteOne({
          _id: id,
          user: result.id
        })
        .then(function (response) {
          comment.deleteMany({
              bookId: id
          })
          .then(function (responseDeleteMany) {
            res.status(200).json({
              message: 'Successfully deleted a book!',
              response
            })
          })
          .catch(function (err) {
            res.status(400).json({
              message: err.message,
              err
            })
          })
        })
        .catch(function (err) {
          res.status(400).json({
            message: err.message,
            err
          })
        })
      }
    })
  },
  deleteComment (req, res) {
    const commentId = req.params.id
    const bookId = req.headers.id
    const token = req.headers.token
    jwt.verify(token, process.env.SECRET, function(err, result){
			if (err) {
        res.send({
          err: err,
          message: err.message
        })
			}
			else {
        comment.deleteOne({
          _id: commentId,
          user: result.id
        })
        .then(function (response) {
          res.status(200).json({
            message: 'Successfully deleted a comment',
            response
          })
        })
        .catch(function (err) {
          res.status(400).json({
            message: err.message,
            err
          })
        })
      }
    })
  }
}