import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'


export default async(req,res)=>{
    const {token} = req.headers

    if(!token){
        return res.status(401).json({error:"You must be logged in"})
    }

    try{
        const {userId} = jwt.verify(token , process.env.JWT_SECRET)
        const cart = await Cart.findOne({user:userId})
        res.status(200).json(cart.products)
    }
    catch(err){
        res.status(401).json({error:"something went wrong! login again"})
        console.log(err)
    }

}