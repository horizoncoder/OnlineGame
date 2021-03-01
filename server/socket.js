let rooms = [];
module.exports = () => {
  const getRoomIndex = (roomId) => {
    let index = rooms.findIndex((_room) => _room.id === roomId);
    if (index === -1) {
      rooms.push({
        id: roomId,
        users: [],
      });
      index = 0;
    }
    return rooms.findIndex((_room) => _room.id === roomId);
  };

  const addUserToRoom = (username, roomId) => {
    const index = getRoomIndex(roomId);
    rooms[index].users.push(username);
    return rooms[index];
  };
  const removeUserFromRoom = (username, roomId) => {
    const index = getRoomIndex(roomId);
    for (let i = 0; i < rooms[index].users.lenght; i++) {
      if (rooms[index].users[i] === username) {
        rooms[index].users.splice(i, 1);
      }
    }
    return rooms[index];
  };
  return {
    addUserToRoom,
    removeUserFromRoom,
  };
};
