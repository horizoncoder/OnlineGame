const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "19092001",
  port: 5432,
  database: "player"
});

module.exports = pool;
