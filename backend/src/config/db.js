import mongoose from "mongoose";
export const connectDB = async () =>{
try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MONGODB CONNECTED SUCESSFULLY")
} catch (error){
    console.error("error connecting to mongodb",error)
    process.exit(1)
}
}