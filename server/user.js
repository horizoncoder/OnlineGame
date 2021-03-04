const users = [];
const express = require('express');

const app = express();
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUser) {
    return { error: 'Username is taken' };
  }
  if (!name || !room) {
    return { error: 'Username and room are required' };
  }

  const user = { id, name, room };
  users.push(user);
  console.log(users);
  app.get('/api/customers', (req, res) => {
    const customers = [{ id: 1, firstName: 'john', lastName: 'Doe' }];
    res.json(customers);
  });
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);
const getRooms = (id) => users.find((room) => room.id === id);

const getUserInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUserInRoom, getRooms };
app.use(express.json());
