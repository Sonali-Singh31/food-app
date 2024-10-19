const categoryModel = require("../models/categoryModel");

const createCategoryController = async(req,res)=>{
    try {
        const {title,imageUrl} = req.body;
        if(!title ){
            return res.status(500).send({
                success:false,
                message:"Please provide title "
            })
        }
        const newCategory = new categoryModel({
            title,
            imageUrl
        })
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:"New category created successfully!! ",
            newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in creating creating category API"
        })
    }
}

// GET ALL 
const getAllCategoryController = async(req,res)=>{
    try {
        const categories = await categoryModel.find({});
        if (!categories) {
          res.status(404).send({
            success: false,
            message: "No Category is available",
          });
        }
        res.status(200).send({
          success: true,
          totalCount: categories.length,
          categories,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in get all Category API",
        });
      }
}

// update category
const updateCategoryController = async(req,res)=>{
    try {
        const {id} = req.params;
        const {title,imageUrl} = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true});
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:"no category found"
            })
        }
        res.status(200).send({
            success:true,
            message:"category updated successfully!!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in update cat API"
        })
    }
}

const deleteCategoryController = async(req,res)=>{
    try {
        const catId = req.params.id;
        if (!catId) {
            return res.status(404).send({
                success: false,
                message: "please provide category ID No category id is found",
            });
        }
        const cat = await categoryModel.findById(catId);
        if(!cat){
            return res.status(500).send({
                success:false,
                message:"no cat is found with this id"
            })
        }
        await categoryModel.findByIdAndDelete(catId);
        res.status(200).send({
            success:true,
            message:"Category deleted successfully!!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete in cat API"
        })
    }
}

module.exports = {createCategoryController,getAllCategoryController,updateCategoryController,deleteCategoryController};