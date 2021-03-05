const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Game = require('../models/Game');

// router.get('/', (req, res) => Game.findALL()
//     .then((game) => {
//       console.log(game);
//       res.sendStatus(200);
//     })
//     .catch((err) => console.log(err))
// );
// Add
router.get('/add', (req, res) => {
  const data = {
    name: 'Dimas ',
    room: 'Room s',
    rednum: '333s',
    bluenum: 'ddds',
    win: 'wisn',
  };
  const {
    name, room, rednum, bluenum, win,
  } = data;
  // Insert into
  Game.create({
    name,
    room,
    rednum,
    bluenum,
    win,
  })
    .then(games=> res.redirect('/game'))
  .catch(err=> console.log(err));
});
module.exports = router;
