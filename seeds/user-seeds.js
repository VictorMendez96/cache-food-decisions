
const { User } = require("../models");

const userData = [
  {
    email: "hugh_jazz@test.com",
    password: "12345678",
    firstName: "Hugh",
    lastName: "Jazz",
    intolerances: "Dairy,Gluten",
    cuisines: "",
    diet: "Paleo",
    recipes: "",
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
