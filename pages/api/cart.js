import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'


export default async(req,res)=>{
  switch (req.method) {
    case "GET":
        await fetchProducts(req,res)
        break;
    case "PUT":
        await addProduct(req,res)
  }

}

function isAuthenticated(icomponent){
    return (req,res)=>{
        const {token} = req.headers

        if(!token){
            return res.status(401).json({error:"You must be logged in"})
        }

        try{
            const {userId} = jwt.verify(token , process.env.JWT_SECRET)
            req.userId = userId
            return icomponent(req,res)
        }
        catch(err){
            res.status(401).json({error:"something went wrong! login again"})
            console.log(err)
        }

    }
}

const fetchProducts = isAuthenticated(async(req,res)=>{
   
        const cart = await Cart.findOne({user:req.userId})
        res.status(200).json(cart.products)

})

const addProduct = isAuthenticated(async(req,res)=>{
    const {quantity, productId} = req.body

    const cart = await Cart.findOne({user:req.userId})
   const exists = await cart.products.some(pdoc => productId === pdoc.product.toString())
   if(exists){
    await Cart.findOneAndUpdate(
        {_id:cart._id , "products.product":productId},
        {$inc:{"products.$.quantity":quantity}}
    )
   }
   else{
    const newProduct = {quantity,product:productId}
    await Cart.findByIdAndUpdate({_id:cart._id},{
        $push:{products:newProduct}
    })
   }

   res.status(200).json({message:"Product added to cart"})

})