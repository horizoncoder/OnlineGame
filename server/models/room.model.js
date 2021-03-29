module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define('room', {
    userid1: {
      type: Sequelize.STRING,
    },
    userid2: {
      type: Sequelize.STRING,
    },
    room: {
      type: Sequelize.STRING,
    },
    status: {
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

  return Room;
};
