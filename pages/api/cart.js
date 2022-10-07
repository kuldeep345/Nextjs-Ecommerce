
import Cart from '../../models/Cart'
import initDB from '../../helpers/initDB'
import isAuthenticated from '../../helpers/Authenticated'


initDB()

export default async(req,res)=>{
    switch (req.method) {
        case "GET":
            await fetchProducts(req,res)
            break;
        case "PUT":
            await addProduct(req,res)
            break
        case "DELETE":
            await removeProduct(req,res)
            break
            }
                
            }
            


const fetchProducts = isAuthenticated(async(req,res)=>{
   
        const cart = await Cart.findOne({user:req.userId}).populate("products.product")
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


const removeProduct = isAuthenticated(async(req,res)=>{
    const {productId} = req.body
    console.log(req.userId)
   const cart = await Cart.findOneAndUpdate(
    {user:req.userId},
    {$pull:{products:{product:productId}}},
    {new:true}
    ).populate("products.product")
    res.status(200).json(cart.products)
})