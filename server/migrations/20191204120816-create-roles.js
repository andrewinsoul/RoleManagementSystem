'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  ),
  down: (queryInterface, _) => (
    queryInterface.dropTable('roles')
  )
};
