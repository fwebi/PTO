"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("PTORequests", "startDate", {
      type: Sequelize.DATEONLY, // Change to DATEONLY
      allowNull: false,
    });

    await queryInterface.changeColumn("PTORequests", "endDate", {
      type: Sequelize.DATEONLY, // Change to DATEONLY
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("PTORequests", "startDate", {
      type: Sequelize.DATE, // Revert to DATETIME
      allowNull: false,
    });

    await queryInterface.changeColumn("PTORequests", "endDate", {
      type: Sequelize.DATE, // Revert to DATETIME
      allowNull: false,
    });
  },
};