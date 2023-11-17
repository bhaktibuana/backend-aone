"use strict";

/** @type {import('sequelize-cli').Migration} */
const moment = require("moment");
const Model = require("../../dist/models");
const dateNow = moment().toDate();

module.exports = {
  async up(queryInterface, Sequelize) {
    const model = new Model.default();

    const userData = await model.models.User.findOne({
      where: { username: "superadmin", email: "admin@aone.bhaktibuana.com" },
    });

    await queryInterface.bulkInsert(
      "UserLogin",
      [
        {
          userId: userData.id,
          createdAt: dateNow,
          createdBy: "Bulk Insert",
          updatedBy: dateNow,
          updatedBy: "Bulk Insert",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserLogin", null, {});
  },
};
