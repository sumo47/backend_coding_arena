const mongoose = require('mongoose')
const courseModel = require('../model/courseModel')
const cartModel = require('../model/cartModel')
const userModel = require('../model/userModel')

const createCart = async (req, res) => {

    try {
        let data = req.body
        const { userId, courseId, cartId } = data

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please enter required field in body " })

        // userId validation
        if (!userId) return res.status(404).send({ status: false, message: "Please provide userI-id in body" })
        let checkUser = await userModel.findById(userId)
        if (!checkUser) return res.status(404).send({ status: false, message: "User not found !" })

        // courseId validation
        if (!mongoose.isValidObjectId(courseId)) return res.status(400).send({ status: false, message: "please enter valid course-Id in request body" })
        let checkCourse = await courseModel.findById(courseId)
        if (!checkCourse) return res.status(404).send({ status: false, message: "Course does not exist !" })

        // if cart exist but cartId is not provided in req.body
        if (!cartId) {
            let isCartExist = await cartModel.findOne({ userId: userId })
            if (isCartExist) {
                cartId = isCartExist._id
            }
        }

        //even cart does not exist
        if (!cartId) {
            let newCart = {
                userId: userId,
                courseId: courseId,
                totalPrice: checkCourse.price,
                totalCourses: 1
            }

            const createCart = await cartModel.create(newCart)

            return res.status(201).send({ status: true, message: createCart })
        }else{  // if cart exist

            if (!mongoose.isValidObjectId(cartId)) return res.status(400).send({ status: false, message: "please enter valid cartId in request body" })
            let checkCart = await cartModel.findById(cartId).lean() //it will convert mongoose object to js object
            if(!checkCart) return res.status(404).send({status:false, message:"Cart does not exist !"})

            let courseData = await courseModel.findById(courseId)

            let totalPrice = checkCart.totalPrice + courseData.price //! check weather it's working or not

            // Authorisation
            if(checkCart.userId != userId) return res.status(403).send({status:false, message:"You are not authorised to store course in this cart"})

            let createCart = await cartModel.findByIdAndUpdate(checkCart._id,{$set:{totalPrice:totalPrice}}, {new:true})

            return res.status(201).send({status:true, message:createCart})
        }   

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}

module.exports = { createCart }