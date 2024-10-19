const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// routes
// CREATE FOOD || POST
router.post("/create", authMiddleware, createFoodController);

// get all food
router.get("/getAll", getAllFoodsController);

// get food by id
router.get("/get/:id", getSingleFoodController);

// get food by restaurant id
router.get("/getByRestaurant/:id", getFoodByRestaurantController);

// update food
router.put("/update/:id", authMiddleware, updateFoodController);

// delete food
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// place order
router.post('/placeOrder',authMiddleware,placeOrderController)

// order Status
router.post('/orderStatus/:id',adminMiddleware,authMiddleware,orderStatusController)

module.exports = router;
