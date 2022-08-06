const { User } = require("../models");

const userData = [
  {
    email: "hugh_jazz@test.com",
    password: "12345678",
    firstName: "Hugh",
    lastName: "Jazz",
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
