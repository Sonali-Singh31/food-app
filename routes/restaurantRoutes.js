const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantControllers");
const router = express.Router();

// routes
// create restaurant || POST
router.post("/create", authMiddleware, createRestaurantController);

// get all restaurant || GET
router.get("/getAll", getAllRestaurantController);

// get restaurant by ID || GET
router.get("/get/:id", getRestaurantByIdController);

// DELETE RESTAURANT || DELETE
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;
