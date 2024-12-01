const { Op } = require('sequelize');
const Book = require('../models/bookModel');
const Genre = require('../models/genreModel');

// List all books with their associated genres
exports.listBooks = async (req, res) => {
  try {
      // Fetch all books along with their genre
      const books = await Book.findAll({
          include: {
              model: Genre,
              as: 'genre'
          }
      });

      // Fetch all genres (just in case you need them later)
      const genres = await Genre.findAll();

      // Render the books list page
      res.render('books/list', {
          books,
          genres,  // Optional, in case you want to add filtering later
          searchQuery: '',  // Empty search initially
          genreId: ''       // No genre filter by default
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
};

exports.viewBook = async (req, res) => {
  const { id } = req.params; // Get the book ID from the URL
  try {
    const book = await Book.findByPk(id, {
      include: [
        {
          model: Genre,
          as: 'genre',  // This matches the alias in the association
        },
      ],
    });
    if (book) {
      res.render('books/detail', { book });  // Render the detail page with the book's details
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.searchBooks = async (req, res) => {
  try {
      const { search } = req.query;
      const where = {};

      // Add search condition if a search query is provided
      if (search) {
          where[Op.or] = [
              { title: { [Op.iLike]: `%${search}%` } },  // Case-insensitive search by title
              { author: { [Op.iLike]: `%${search}%` } }  // Case-insensitive search by author
          ];
      }

      // Fetch books based on search query
      const books = await Book.findAll({
          where,
          include: {
              model: Genre,
              as: 'genre'
          }
      });

      // Fetch all genres to populate the genre filter
      const genres = await Genre.findAll();

      // Render the books list with search applied
      res.render('books/list', {
          books,
          genres,
          searchQuery: search || '',
          genreId: ''
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
};

// Filter Books by Genre
exports.filterBooksByGenre = async (req, res) => {
  try {
      const { genreId } = req.query;
      const where = {};

      // Add genre filter if genreId is provided
      if (genreId) {
          where.genreId = genreId;
      }

      // Fetch books based on genreId
      const books = await Book.findAll({
          where,
          include: {
              model: Genre,
              as: 'genre'
          }
      });

      // Fetch all genres to populate the genre filter
      const genres = await Genre.findAll();

      // Render the books list with genre filter applied
      res.render('books/list', {
          books,
          genres,
          searchQuery: '',
          genreId: genreId || ''
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
};

// Render the form to add a new book
exports.addBookForm = async (req, res) => {
  try {
    const genres = await Genre.findAll(); // Get all genres
    res.render('books/add', { genres });  // Render the 'add.ejs' form with available genres
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Add a new book to the database
exports.addBook = async (req, res) => {
  const { title, author, price, copiesLeft, genreId, imageUrl} = req.body;
  try {
    await Book.create({
      title,
      author,
      price,
      copiesLeft,
      genreId,
      imageUrl,
    });
    res.redirect('/books');  // Redirect to the list of books after successful addition
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Render the form to edit an existing book
exports.editBookForm = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id, {
      include: [
        {
          model: Genre,
          as: 'genre',  // This should match the alias in the association
        },
      ],
    });
    const genres = await Genre.findAll(); // Get all genres for the dropdown
    res.render('books/edit', { book, genres });  // Render the 'edit.ejs' form with book details and genres
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, price, copiesLeft, genreId, imageUrl } = req.body; // Added imageUrl
  try {
    const book = await Book.findByPk(id);
    if (book) {
      // Update book with the new details, including the image URL
      await book.update({
        title,
        author,
        price,
        copiesLeft,
        genreId,
        imageUrl,  // Ensure imageUrl is updated
      });
      res.redirect('/books');  // Redirect to the list of books after successful update
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


// Delete a book from the database
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (book) {
      await book.destroy();  // Delete the book from the database
      res.redirect('/books');  // Redirect to the list of books after deletion
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// View a single book's details
exports.viewBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id, {
      include: [
        {
          model: Genre,
          as: 'genre',  // This should match the alias in the association
        },
      ],
    });
    if (book) {
      res.render('books/detail', { book });  // Render the 'detail.ejs' view with the book's details
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
