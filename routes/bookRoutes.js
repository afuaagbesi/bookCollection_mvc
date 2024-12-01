const express = require('express');
const router = express.Router();
const bookController = require('../app/controllers/bookController');

router.get('/', bookController.listBooks);
router.get('/add', bookController.addBookForm);
router.post('/', bookController.addBook);
router.get('/edit/:id', bookController.editBookForm);
router.post('/edit/:id', bookController.updateBook);
router.post('/delete/:id', bookController.deleteBook);
router.get('/search', bookController.searchBooks);
router.get('/filter',bookController.filterBooksByGenre);
router.get('/:id', bookController.viewBook);  // This handles the 'view book' route

module.exports = router;
