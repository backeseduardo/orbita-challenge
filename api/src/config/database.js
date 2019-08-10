module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'docker',
  database: 'ocd',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
