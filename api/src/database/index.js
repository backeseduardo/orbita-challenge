import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Installation from '../app/models/Installation';

const models = [User, File, Installation];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  getConnection() {
    return this.connection;
  }
}

export default new Database();
