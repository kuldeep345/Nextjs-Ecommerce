import initDB from '../../helpers/initDB'
import User from '../../models/User'
import bcrypt from 'bcryptjs'

initDB()

export default async(req,res)=>{
    const {name,email,password} = req.body
    try {
        if(!name || !email || !password){
            return res.status(422).json({error:"Please fill all the fields"})
        }

        const user = await User.findOne({email})
        if(user){
            return res.status(422).json({error:"User already exists with this email"})
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const newUser = await new User({
            name,
            email,
            password:hashedPassword
        }).save()

        console.log(newUser)
        res.status(201).json({message:"SignUp Success"})

    } catch (error) {
        res.status(500).json({message:"Internal Server  error"})
    }
}