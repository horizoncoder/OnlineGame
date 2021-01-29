const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  user: 'myuser',
  password: process.env.BDpassword,
  port: 5432,
  database: 'player',
});

module.exports = pool;
