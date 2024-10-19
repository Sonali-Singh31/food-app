const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    // if (user.userType !== "admin") {
    //   return res.status(401).send({
    //     success: false,
    //     message: "Only Admin ACess ",
    //   });
    // } else {
    //   next();
    // }
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is admin
    else if (user.userType !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin Access",
      });
    }

    // Proceed to the next middleware or route handler
    else  next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Un-AUthorized ACCESS",
      error,
    });
  }
};