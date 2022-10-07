import initDB from '../../helpers/initDB'
import isAuthenticated from '../../helpers/Authenticated'
import Order from '../../models/Order'

initDB()


export default isAuthenticated(async(req,res)=>{
   const orders = await Order.findOne({user:req.userId}).populate("products.product")
   res.status(200).json(orders)
})