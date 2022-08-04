const { User } = require("../models");

const userData = [
  {
    id: 1,
    username: "hugh_jazz",
    // password: password123
    password: "$2a$10$bDrJ309Q3nQR99/ENwrnjOFS8rW8qpgzKuOoe0k5/EhWQVvWtfbNa",
    firstName: "Hugh",
    lastName: "Jazz",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
