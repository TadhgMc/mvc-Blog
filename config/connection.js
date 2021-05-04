const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'ec2-54-160-96-70.compute-1.amazonaws.com',
      dialect: 'mysql',
      port: 5432
    }
  );
};

module.exports = sequelize;
