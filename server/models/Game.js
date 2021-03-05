const { Sequelize } = require('sequelize');
const db = require('../config/database');

const Game = db.define('game', {
  name: {
    type: Sequelize.STRING,
  },
  room: {
    type: Sequelize.STRING,
  },
  rednum: {
    type: Sequelize.STRING,
  },
  bluenum: {
    type: Sequelize.STRING,
  },
  win: {
    type: Sequelize.STRING,
  },
});
db.sync({ force: true });
module.exports = Game;
