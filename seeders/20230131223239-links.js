'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('links', [{
        long_url: 'https://www.github.com/reidn3r',
        short_url: 'abcde',
        last_time_visited: new Date(),
        updatedAt: new Date(),
        createdAt: new Date()
        
    }], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('links', null, {});
  }
};
