import mongoose from 'mongoose'

async function initDB(){
    if(mongoose.connections[0].readyState){
        console.log("Already connected")
        return
    }
    await mongoose.connect(process.env.MONGO_URI)

    mongoose.connect.on("connected" , ()=>{
        console.log("Connected to mongo")
    })

    mongoose.connection.on("error" , ()=>{
        console.log("Error connecting to mongo")
    })
}

export default initDB