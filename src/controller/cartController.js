const mongoose = require('mongoose')
const courseModel = require('../model/courseModel')
const cartModel = require('../model/cartModel')

const createCart = async (req, res) => {

 try {
       let data = req.body
       const {userId, courseId} = data
   
       if(!userId) return res.status(404).send({status:false, message:"user not found!"})
   
       let courseData = await courseModel.findOne({id:courseId})
       if(!courseData) return res.status(404).send({status:false, message:"course not found!"})
   
       let newCart = {
           userId : userId,
           courseId: courseId,
           totalPrice: courseData.price,
           totalCourses: 1
       }
   
       const createCart = await cartModel.create(newCart)
   
       return res.status(201).send({status:true, message:createCart})
 } catch (error) {
    res.status(500).send({status:false, message:error.message})
 }

}

module.exports = {createCart}