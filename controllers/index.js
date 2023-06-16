// IMPORTS & DEPENDENCIES
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

// MIDDLEWARE & ROUTES
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

// EXPORTS & ROUTES
module.exports = router;
