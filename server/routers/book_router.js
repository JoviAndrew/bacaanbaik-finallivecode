const router = require('express').Router()
const { getAllBooks, addBook, addComment, searchBook } = require('../controllers/book_controller')
const uploadFile = require('../middleware/upload')

router.get('/show', getAllBooks)

router.post('/add-book',
            uploadFile.multer.single('img'), 
            uploadFile.sendUploadToGCS,
            addBook)

router.post('/add-comment/:id', addComment)

router.put('/like/:id')

router.post('/show/:title', searchBook)

router.delete('/delete/:id')

router.delete('/delete-comment/:id')

module.exports = router