"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LogoutLog", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      loginLogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "LoginLog",
          key: "id",
        },
      },
      ipAddress: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      userAgent: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      device: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      logoutAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "User",
          key: "id",
        },
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deletedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "User",
          key: "id",
        },
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
    await queryInterface.dropTable("LogoutLog");
  },
};
