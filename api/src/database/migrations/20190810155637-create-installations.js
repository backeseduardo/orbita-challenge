module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('installations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      data_provider: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: 'DATE', // Postgres date (no time of day)
        allowNull: false,
      },
      system_size: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      zip_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('installations');
  },
};
