const restaurantModel = require("../models/restaurantModel");

// create restaurant controller
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address",
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newRestaurant.save();
    res.status(201).send({
      success: true,
      message: "new restaurant created successfully!!",
      newRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Restaurant API",
    });
  }
};

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      res.status(404).send({
        success: false,
        message: "No restaurant is available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all restaurant API",
    });
  }
};

// get restaurant by id
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "please provide restaurant ID",
      });
    }
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "no restaurant found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get restaurant by ID API",
      error,
    });
  }
};

// delete restaurant
const deleteRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "please provide restaurant ID No restaurant id is found",
            });
        }
        await restaurantModel.findByIdAndDelete(restaurantId);
        res.status(200).send({
            success:true,
            message:"Restaurant deleted successfully!!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in delete restaurant API",
            error
        })
    }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
