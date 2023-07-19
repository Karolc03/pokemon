const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("type", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};
