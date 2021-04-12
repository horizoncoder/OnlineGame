const db = require('../models');

const Room = db.rooms;
const { Sequelize } = db;
const { Op } = Sequelize;

// Create and Save a new Room
exports.create = (req, res) => {
  // Validate request
  if (!req.body.room) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Room
  const rooms = {
    userid1: req.body.userid1,
    userid2: req.body.userid2,
    room: req.body.room,
    status: req.body.status,
    rednum: req.body.rednum,
    bluenum: req.body.bluenum,
    win: req.body.win,
    test: req.body.test,
    turn:req.body.count,
    states:req.body.states
  }
  // Save Room in the database
  Room.create(rooms)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Room.',
      });
    });
};

// Retrieve all Rooms from the database.
exports.findAll = (req, res) => {
  Room.findAll({ where: { status: ['wait'] } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving roomss.',
      });
    });
};

// Find a single Room with an id
exports.findOne = (req, res) => {
  const { id } = req.params;

  Room.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving Room with id=${id}`,
      });
    });
};

// Update a Room by the id in the request
exports.update = (req, res) => {
  const { id } = req.params;

  Room.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Room was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Room with id=${id}. Maybe Room was not found or req.body is empty!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Room with id=${id}`,
      });
    });
};

// Delete a Room with the specified id in the request
exports.delete = (req, res) => {
  const { id } = req.params;

  Room.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Room was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Room with id=${id}. Maybe Room was not found!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Room with id=${id}`,
      });
    });
};

// Delete all Rooms from the database.
exports.deleteAll = (req, res) => {
  Room.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Rooms were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all roomss.',
      });
    });
};

// find all published Room
exports.findAllPublished = (req, res) => {
  console.log('req.user', req.user.username);
  Room.findAll({
    where: {
      [Op.or]: [{ userid1: req.user.username }, { userid2: req.user.username }],
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving roomss.',
      });
    });
};
