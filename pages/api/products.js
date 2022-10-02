import initDB from "../../helpers/initDb"
import Product from '../../models/Product'

initDB()

export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
          await getAllProducts(req,res)        
        break;
      
      case "POST":
        await saveProduct(req,res)
        break
    }
}

const getAllProducts = async(req,res)=>{
  const products = await Product.find()
  res.send(products)
}

const saveProduct = async(req,res)=>{
     const {name,price,description,mediaUrl} = req.body
     console.log(req.body)
     if(!name || !price || !description || !mediaUrl){
      return res.status(422).json({error:"Please Enter all the fields"})
     }
      const product = await new Product({
        name,
        price,
        description,
        mediaUrl
      }).save()

      res.status(201).json({message:"Product created Successfully" , product })

}