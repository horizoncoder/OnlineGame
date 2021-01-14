const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: process.env.BDpassword,
  port: 5432,
  database: "player"
});

module.exports = pool;
