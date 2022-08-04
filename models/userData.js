const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class userData extends Model {}

userData.init(
  {
    data_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    intolerances: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cuisine: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    diet: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    favorites: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "userData",
  }
);

module.exports = userData;
