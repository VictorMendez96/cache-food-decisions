const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe extends Model {}

Recipe.init(
  {
    sql_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    meal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prepTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "recipe",
  }
);

module.exports = Recipe;
