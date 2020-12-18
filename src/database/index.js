/**
 * Esse arquivo faz a conexão com o banco de dados e carrega todos os dados
 */
import Sequelize from 'sequelize';

import User from '../app/models/User';
import Department from '../app/models/Department';

import databaseConfig from '../config/database';

const models = [User, Department];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
