const express = require('express');
const router = express.Router();
const Genre = require('../app/models/genreModel');  // Adjust path if necessary

// GET all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.render('genres/list', { genres });  // Pass genres to the view
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// GET form to add a new genre
router.get('/add', (req, res) => {
  res.render('genres/add');
});

// POST to create a new genre
router.post('/add', async (req, res) => {
  try {
    const { name } = req.body;
    await Genre.create({ name });
    res.redirect('/genres');  // Redirect to list of genres
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE a genre
router.post('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Genre.destroy({ where: { id } });
    res.redirect('/genres');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
