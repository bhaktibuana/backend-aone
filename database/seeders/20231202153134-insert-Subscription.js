"use strict";

/** @type {import('sequelize-cli').Migration} */
const moment = require("moment");
const dateNow = moment().toDate();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Subscription",
      [
        {
          code: "basic",
          name: "Basic",
          price: 0,
          createdAt: dateNow,
          createdBy: "Bulk Insert",
        },
        {
          code: "personal",
          name: "Personal",
          price: 75000,
          createdAt: dateNow,
          createdBy: "Bulk Insert",
        },
        {
          code: "bussiness",
          name: "Bussiness",
          price: 350000,
          createdAt: dateNow,
          createdBy: "Bulk Insert",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Subscription", null, {});
  },
};
