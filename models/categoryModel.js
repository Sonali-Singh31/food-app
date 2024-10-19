const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "category title is required"],
    },
    imageUrl: {
        type: String,
        default: "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    }, 
},{timestamp:true})

// export

module.exports = mongoose.model("Category",categorySchema);