import Sequelize, { Model } from 'sequelize';

class Material extends Model {
  static init(sequelize) {
    super.init(
      /**
       * Colunas desse objeto
       * Esse campos não precisam refletir os campos do banco de dados
       * Devem ser os campos que o usuário deve preencher.
       *  */
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        is_permanent: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.MaterialItem, {
      foreignKey: 'material_id',
      as: 'materials',
    });
  }
}

export default Material;
