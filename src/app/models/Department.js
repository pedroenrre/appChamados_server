import Sequelize, { Model } from 'sequelize';

class Department extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        manager_department: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'department_id', as: 'users' });
    this.hasMany(models.Service, {
      foreignKey: 'department_id',
      as: 'services',
    });
  }
}

export default Department;
