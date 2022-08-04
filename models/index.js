const User = require("./User");
const userData = require("./userData");

User.hasOne(userData, {
  foreignKey: "id",
});

module.exports = { User, userData };
