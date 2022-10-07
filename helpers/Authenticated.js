import jwt from 'jsonwebtoken'

export default function isAuthenticated(icomponent){
  
    return (req,res)=>{
        const {token} = req.headers
        
        if(!token){
            return res.status(401).json({error:"You must be logged in "})
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