const router = require('express').Router()
const { getAllBooks, addBook, addComment, searchBook, likeBook, unlikeBook, deleteComment, deleteBook, getOneBook } = require('../controllers/book_controller')
const uploadFile = require('../middleware/upload')

router.get('/show', getAllBooks)

router.post('/add-book',
            uploadFile.multer.single('img'), 
            uploadFile.sendUploadToGCS,
            addBook)

router.post('/add-comment/:id', addComment)

router.put('/like/:id', likeBook)

router.put('/unlike/:id', unlikeBook)

router.get('/show/:id', getOneBook)

router.post('/show/:title', searchBook)

router.delete('/delete/:id', deleteBook)

router.delete('/delete-comment/:id', deleteComment)

module.exports = router