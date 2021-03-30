require('dotenv').config();

module.exports = {
  HOST: process.env.DBhost,
  USER: process.env.DBuser,
  PASSWORD: process.env.BDpassword,
  DB: process.env.DBname,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
