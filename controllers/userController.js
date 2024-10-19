const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")
// GET USER INFO
const getUserController = async(req,res)=>{
    try {
        // find User
        const user = await userModel.findById({_id:req.body.id},{_id:0})

        // Validation
        if(!user){
            res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        // hide password
        user.password = undefined
        res.status(200).send({
            success:true,
            message:"user get successfully!!",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get user API",
            error
        })
    }
}

const updateUserController = async(req,res)=>{
    try {
        const user = await userModel.findById({_id:req.body.id})

        // Validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        const {userName,address,phone} = req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone
        await user.save(); 
        res.status(200).send({
            success:true,
            message:"User Successfully Updated!!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in update user API",
            error
        })
    }
}

// updateUserPassword

const updatePasswordController = async(req,res)=>{
    try {
        // find user
        const user = await userModel.findOne({_id:req.body.id});

        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        const {oldPassword,newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(505).send({
                success:false,
                message:'Please Provide All Credentials'
            })
        }
        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: "Invalid old password",
            });
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success:true,
            message:'password update successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in password update API",
            error
        })
    }
}

// resetPasswordController
const resetPasswordController = async(req,res)=>{
    try {
        const{email,newPassword,answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:"please provide all field"
            })
        }
        const user =await userModel.findOne({email,answer});
        if(!user){
            return res.status(500).send({
                success:false,
                message:"user not found"
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
        await user.save();
        res.status(200).send({
            success:true,
            message:'password reset successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in reset password API",
            error
        })
    }
}

// delete user 
const deleteProfileController = async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Your account has been deleted!!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in delete profile API',
            error
        })
    }
}

module.exports = {getUserController,updateUserController,updatePasswordController,resetPasswordController,deleteProfileController};