const { Model, DataTypes } = require('sequelize'); 
const sequelize = require('../../config/db'); // Import sequelize instance

class Book extends Model {}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255), // Default length should suffice
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0, // Prevent negative prices
    },
  },
  copiesLeft: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'copies_left', // Match column name in DB
  },
  genreId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'genres', // Table name for genres
      key: 'id',
    },
    allowNull: false,
    field: 'genre_id', // Match column name in DB
  },
  imageUrl: {
    type: DataTypes.TEXT, // Use TEXT for potentially longer URLs
    allowNull: true, // Allow null if no image is provided
    
    field: 'image_url', // Match column name in DB
  },
}, {
  sequelize,
  modelName: 'Book',
  tableName: 'books',
  timestamps: false, // Skip createdAt and updatedAt
});

module.exports = Book;
