const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "your password",
  port: 5432,
  database: "your data base name"
});

module.exports = pool;
