'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      long_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      short_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      num_access: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      last_time_visited: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW

      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('links');
  }
};