const { userData } = require("../models");

const userData_data = [
  {
    data_id: 1,
    user_id: 1,
    intolerances: "Dairy,Gluten",
    cuisines: "American,Chinese,Mexican,Spanish,Italian,Indian,Greek,Cajun",
    diet: "Paleo",
  },
];

const seedUserData = () => userData.bulkCreate(userData_data);

module.exports = seedUserData;
