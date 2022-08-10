const router = require("express").Router();
const userRoutes = require("./userRoutes");
const recipesRoutes = require("./userRoutes");
const shoppingRoutes = require("./userRoutes");

router.use("/users", userRoutes);
router.use("/recipes", recipesRoutes);
router.use("/shoppingList", shoppingRoutes);

module.exports = router;
