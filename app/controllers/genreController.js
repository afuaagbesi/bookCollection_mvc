const Genre = require('../models/genreModel');

exports.listGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.render('genres/list', { genres });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.showAddGenreForm = (req, res) => {
  res.render('addGenre');
};

exports.addGenre = async (req, res) => {
  const { name } = req.body;
  try {
    await Genre.create({ name });
    res.redirect('/genres');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding genre');
  }
};

exports.deleteGenre = async (req, res) => {
  const { id } = req.params;
  try {
    await Genre.destroy({ where: { id } });
    res.redirect('/genres');  // Redirect back to genres list after deleting
  } catch (error) {
    console.error('Error deleting genre:', error);
    res.status(500).send('Server Error');
  }
};