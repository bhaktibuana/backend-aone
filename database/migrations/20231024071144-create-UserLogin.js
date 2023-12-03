"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserLogin", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      ipAddress: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      userAgent: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      device: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      otpToken: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
      createdBy: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedBy: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deletedBy: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserLogin");
  },
};
