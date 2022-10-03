import  mongoose from "mongoose";

export default async function initDB(){
    if(mongoose.connections[0].readyState){
        console.log("Already connected")
        return
    }
    await mongoose.connect(process.env.MONGO_URI)
}
