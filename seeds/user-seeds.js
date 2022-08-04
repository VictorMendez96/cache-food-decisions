const { User } = require("../models");

const userData = [
  {
    id: 1,
    email: "hugh_jazz@test.com",
    password: "12345678",
    firstName: "Hugh",
    lastName: "Jazz",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
