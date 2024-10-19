const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"user name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true,"Phone number is required"]
    },
    userType:{
        type:String,
        required:[true,"user type is required"],
        default:"clinet",
        enum:['clinet','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg'
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{timestamp:true})

// export

module.exports = mongoose.model("User",userSchema);