module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('materials', 'tombo', { transaction: t }),
        queryInterface.removeColumn('materials', 'department_id', {
          transaction: t,
        }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'materials',
          'tombo',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'materials',
          'departament_id',
          {
            type: Sequelize.BOOLEAN,
            allowNull: false,
          },
          {
            transaction: t,
          }
        ),
      ]);
    });
  },
};
