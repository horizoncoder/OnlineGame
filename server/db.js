const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DBhost,
  user: process.env.DBuser,
  password: process.env.BDpassword,
  port: process.env.DBport,
  database: process.env.DBname,
});

module.exports = pool;
