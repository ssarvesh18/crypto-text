const jwt = require('jsonwebtoken');


const authorize = async(req,res,next)=>{
    try{
        
        const authHeader = req.headers['authorization'];
        const token =  authHeader.split(" ")[1];
        
        await jwt.verify(token,process.env.SECRET , (err,data)=>{
            if(err)
            {
                res.status(403).json({
                    message: "Session time out!"
                })
            }
            else
            {
                req.user = data.person;
                next();
            }
        });
       
    }catch(err){
        res.status(401).json({
            message : "unauthorized access!"
        })
    }
}
const authorize2 = async(req,res)=>{
    try{
        
        const authHeader = req.headers['authorization'];
        const token =  authHeader.split(" ")[1];
        
        await jwt.verify(token,process.env.SECRET , (err,data)=>{
            
            if(err)
            {
                res.status(403).json({
                    message: "Session time out!"
                })
            }
            else
            {
                res.json({
                    user : data.person
                })
            }
        });
       
    }catch(err){
        res.status(401).json({
            message : "unauthorized access!"
        })
    }
}

module.exports = {
    authorize,
    authorize2
}