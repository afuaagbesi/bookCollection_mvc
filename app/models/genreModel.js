const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

class Genre extends Model {}

Genre.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Genre',
  tableName: 'genres',
  timestamps: false, // Omit timestamps if not needed
});

// No need to import or associate Book here

module.exports = Genre;
