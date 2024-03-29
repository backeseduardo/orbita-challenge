require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  logging: process.env.NODE_ENV === 'development' ? console.log : false, // eslint-disable-line
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
