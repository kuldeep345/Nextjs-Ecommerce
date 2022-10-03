import initDB from '../../helpers/initDB'
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

initDB()

export default async(req,res)=>{
    const {email,password} = req.body
    try {
        if(!email || !password){
            return res.status(422).json({error:"Please fill all the fields"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(422).json({error:"Invalid credentials"})
        }
        
       const doMatch = await bcrypt.compare(password , user.password)
       
       if(doMatch){
           const {name,role,email} = user
           const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET)
            res.status(201).json({message:"Login Success", name,role,email , token})
       }
       else{
        res.status(401).json({error:"Invalid Credentails"})
       }

    } catch (error) {
        res.status(500).json({message:"Internal Server  error"})
        console.log(error)
    }
}