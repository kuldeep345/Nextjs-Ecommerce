import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const orderSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"user"
    },
    products:[
        {
            quantity:{type:Number , default:1},
            product:{type:ObjectId, ref:"Product"}
        }
    ],
    email:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
})



export default mongoose.models.Order || mongoose.model('Order',orderSchema)