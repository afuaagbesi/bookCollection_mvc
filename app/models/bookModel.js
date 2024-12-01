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
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  copiesLeft: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genreId: {  // Define genreId as a foreign key
    type: DataTypes.INTEGER,
    references: {
      model: 'genres', // Reference to Genre model (table name)
      key: 'id',
    },
    allowNull: false,
  },
  imageUrl: {  // Add the imageUrl field to store image URLs
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Book',
  tableName: 'books',
  timestamps: false, // Omit timestamps if not needed
});

// Do not define the association (Book.belongsTo) here.
// Define it centrally in your main application file (e.g., server.js or associations.js).

module.exports = Book;
