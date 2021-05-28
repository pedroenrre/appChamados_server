import Sequelize, { Model } from 'sequelize';

class MaterialItem extends Model {
  static init(sequelize) {
    super.init(
      /**
       * Colunas desse objeto
       * Esse campos não precisam refletir os campos do banco de dados
       * Devem ser os campos que o usuário deve preencher.
       *  */
      {
        tombo: Sequelize.STRING,
        material_id: Sequelize.INTEGER,
        department_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Material, {
      foreignKey: 'material_id',
      as: 'material',
    });
    this.belongsTo(models.Department, {
      foreignKey: 'department_id',
      as: 'department',
    });
  }
}

export default MaterialItem;
