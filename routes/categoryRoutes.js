const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController } = require("../controllers/categoryController");

const router = express.Router();

// routes

// create
router.post('/create',authMiddleware,createCategoryController)

// getAll || GET
router.get('/getAll',getAllCategoryController);

// update category || PUT
router.put('/update/:id',authMiddleware,updateCategoryController)

// delete category || delete
router.delete('/delete/:id',authMiddleware,deleteCategoryController);
module.exports = router;