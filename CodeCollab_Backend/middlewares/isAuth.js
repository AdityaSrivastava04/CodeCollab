import jwt from "jsonwebtoken"
import { redisClient } from "../index.js"
import { User } from "../models/user.js"

const isAuth = async(req,res,next)=>{
    try {
        
        const token = await req.cookies.accessToken
        console.log(token)

        if(!token){
            return res.status(403).json({
                message:"Please login - no token"
            })
        }

        const decodedData=jwt.verify(token,process.env.JWT_SECRET)

        if(!decodedData){
            return res.status(400).json({message:"token Expired"})
        }

        const cacheUser=await redisClient.get(`user:${decodedData.id}`)

        if(cacheUser){
            req.user=JSON.parse(cacheUser)
            return next()  
        }

        const user = await User.findById(decodedData.id).select("-password")

        if(!user){
            return res.status(400).json({
                message:"no user with this id"
            })
        }

        await redisClient.setEx(`user:${user._id}`,3600,JSON.stringify(user))

        req.user=user
        next()

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export default isAuth