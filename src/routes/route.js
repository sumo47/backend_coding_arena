const express = require("express")
const router = express.Router()
const { createCart } = require("../controller/cartController")


router.get("/test", (req, res) => {
    res.status(200).send({ status: true, message: "this api is working fine" })
})
router.get("/", (req, res) => {
    res.status(200).send({ status: true, message: "this api is working fine" })
})

router.post("/createCart", createCart)

router.all("/*",function(req,res){
    return res.status(400).send({status:false,message:"invalid path"})
})

module.exports = router