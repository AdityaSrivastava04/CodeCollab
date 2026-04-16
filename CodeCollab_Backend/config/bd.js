import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"CodeCollab",
        })
        console.log("MongoDb connected")
    }catch(error){
        console.log("Failing in Database connection",error)
    }
}
export default connectDB