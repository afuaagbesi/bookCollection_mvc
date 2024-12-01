require('dotenv').config();
const { Sequelize } = require('sequelize');

// Connect to PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log('PostgreSQL Database connected...'))
  .catch((err) => console.error('Error connecting to the database:', err));

module.exports = sequelize;
