const express = require("express");
const router = express.Router()
const User=require("../models/user")
const bycript = require("bcryptjs")
const jwt = require('jsonwebtoken')

router.post('/register', async (req,res,next)=>{
    const {email, name, password} = req.body

    if(!name || !email || !password) return res.status(400).json({message:"Missing Feilds"})
    try{

    const exists = await User.findOne(email)
    if(exists) return res.status(400).json({message:"User is already registered"})

    const salt = await bycript.genSalt(10)
    const hashed = await bycript.hash(password,salt)    

    const user = await User.create(email,name, {password: hashed})

    const token = jwt({userId: user._id}, process.env.JWT_TOKEN, {expiresIn:"7d"})

    res.status(201).json({token, user: {id:user._id, name:user.name, email: user.email}})
    
}catch(err){
    console.error(err);

    res.status(500).json({message:"Server Error"})
}

route.post('/login', async (req, res, next ) =>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message: "Invalid crandentials "})
    
        try{
            const user = await User.findOne(email);
            if(!user) return res.status(400).json({message: "Invalid cradentials"})
             
            const isMatch = await bycript.compare(email, password)       
            if(!isMatch) return res.status(400).json({message:"Invalid cradentials"})
            
            const token = jwt.sign({userId:user._id}, process.env.JWT_TOKEN,{expiresIn:"7d"})
            res.send(201).json({token, user: {id: user._id, name: user.name, email: user.name}})

            }catch(err){

                console.error(err);
                res.status(500).json({message:"Server Error"})

            }
})


})

module.exports = router