import Sequelize, { Model } from 'sequelize';

class Installation extends Model {
  static init(sequelize) {
    super.init(
      {
        data_provider: Sequelize.STRING,
        date: Sequelize.DATE,
        system_size: Sequelize.FLOAT,
        zip_code: Sequelize.INTEGER,
        state: Sequelize.STRING(2),
        cost: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Installation;
