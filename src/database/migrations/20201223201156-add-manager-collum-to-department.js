module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('departments', 'manager_department', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('departments', 'manager_department');
  },
};
