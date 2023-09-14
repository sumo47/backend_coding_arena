const mongoose = require("mongoose");

const courseScheme = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    price:{
        type:Number,
        required:true
    }
},
    { timeStamps: true });
const course = mongoose.model("course", courseScheme);

module.exports = course; 