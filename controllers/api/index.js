const router = require("express").Router();
const userRoutes = require("./userRoutes");
const recipesRoutes = require("./recipesRoutes");
const shoppingRoutes = require("./shoppingRoutes");

router.use("/users", userRoutes);
router.use("/recipes", recipesRoutes);
router.use("/shoppingList", shoppingRoutes);

module.exports = router;
