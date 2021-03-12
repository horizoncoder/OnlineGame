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
  });

  return Room;
};
