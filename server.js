require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/db');
const Genre = require('./app/models/genreModel');
const Book = require('./app/models/bookModel');

const bookRoutes = require('./routes/bookRoutes');
const genreRoutes = require('./routes/genreRoutes');

// Define associations after models are imported
Genre.hasMany(Book, { foreignKey: 'genreId', as: 'books' });
Book.belongsTo(Genre, { foreignKey: 'genreId', as: 'genre' });

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/books', bookRoutes);
app.use('/genres', genreRoutes);

// Home route with Hero Image
app.get('/', (req, res) => {
    res.render('home');
  });
  
// Home route to redirect to books page


  
// Sync Database (Don't use force: true to avoid deleting existing data)
sequelize.sync().then(() => {
  console.log('Database synced');
  // Optional: You can seed your database here if needed, but do not force sync if the tables are already populated
  // For example, you could check and seed some data if necessary (in case of an empty genre table).
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
