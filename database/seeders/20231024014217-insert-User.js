"use strict";

/** @type {import('sequelize-cli').Migration} */
const moment = require("moment");
const Model = require("../../dist/models");
const { hashPassword } = require("../../dist/utils");
const dateNow = moment().toDate();

module.exports = {
  async up(queryInterface, Sequelize) {
    const model = new Model.default();
    
    const roleData = await model.models.Role.findOne({
      where: { code: "SA" },
    });

    const password = hashPassword("aone@admin1234");

    await queryInterface.bulkInsert(
      "User",
      [
        {
          firstName: "Aone",
          lastName: "Super Admin",
          username: "superadmin",
          email: "admin@aone.bhaktibuana.com",
          password,
          roleId: roleData.id,
          createdAt: dateNow,
          createdBy: "Bulk Insert",
          updatedBy: dateNow,
          updatedBy: "Bulk Insert",
          isVerified: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User", null, {});
  },
};
