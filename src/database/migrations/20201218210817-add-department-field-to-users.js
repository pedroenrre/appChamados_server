module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'department_id', {
      type: Sequelize.INTEGER,
      references: { model: 'departments', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'department_id');
  },
};
