module.exports = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: '19092001',
  DB: 'game',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
