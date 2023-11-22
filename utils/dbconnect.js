import mongoose from "mongoose";

let connected = false

export const connectMongo = async()=>{
    try {
        if(connected) return 
        mongoose.connect(process.env.MONGO)
        console.log('connected to mongodb')
        connected = true
    } catch (err) {
        console.log(err.response)
    }
}