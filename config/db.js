require('dotenv').config({path: __dirname + '/../.env'});
const { Sequelize } = require('sequelize');

// Connect to PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL_EXT, {
  dialect: 'postgres',
  pool: {
    max: 5,    // Maximum number of connections
    min: 0,    // Minimum number of connections
    acquire: 30000,  // Timeout before throwing an error if a connection is not acquired
    idle: 10000,     // Time before releasing an idle connection
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Allow self-signed certificates if necessary
    },
  },
});

sequelize
  .authenticate()
  .then(() => console.log('PostgreSQL Database connected...'))
  .catch((err) => console.error('Error connecting to the database:', err));

module.exports = sequelize;
