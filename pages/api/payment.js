import Stripe from 'stripe'
import  jwt  from 'jsonwebtoken'
import Cart from '../../models/Cart'
import Order from '../../models/Order'
import initDB from '../../helpers/initDB'


initDB()



export default async (req,res)=>{

    Stripe.api_key = process.env.SECRET_KEY

    const {paymentInfo} = req.body
    const {token} = req.headers

    if(!token){
        return res.status(401).json({error:"You must be logged in"})
    }
    
    try{
        const {userId} = jwt.verify(token,process.env.JWT_SECRET)
        const cart = await Cart.findOne({user:userId}).populate("products.product")
        let price = 0
        cart.products.forEach(item=>{
            price =  item.quantity * item.product.price
        })     

        await new Order({
            user:userId,
            products:cart.products,
            email:paymentInfo.email,
            total:price
        }).save()

        await Cart.findOneAndUpdate({_id:cart._id},{$set:{products:[]}})

        res.status(200).json({message:"Payment successful"})

    }
    catch(err){
        console.log(err)
        return res.status(500).json("Internal server error")
    }

}


