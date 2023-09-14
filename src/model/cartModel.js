const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const cartSchema = new mongoose.Schema({

    userId: {
        type: ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },

    courseId: {
        type: ObjectId,
        ref: "course",
        required: true
    },

    totalPrice: {
        type: Number,
        required: true,
    },

    totalCourses: {
        type: Number,
        required: true,
    }

}, { timestamps: true })

module.exports = mongoose.model("cart", cartSchema)

//{
//     userId: {ObjectId, refs to User, mandatory, unique},
//     course: {ObjectId, refs to course model, mandatory},
//     totalPrice: {number, mandatory, comment: "Holds total price of all the items in the cart"},
//     totalCourse: {number, mandatory, comment: "Holds total number of course in the cart"},
//     createdAt: {timestamp},
//     updatedAt: {timestamp},
//}
//   ```