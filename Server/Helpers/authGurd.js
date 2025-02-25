
var jwt = require('jsonwebtoken');

//Token virification

const authGurd = async (req,res,next)=>{
    try {
        const token = req.cookies.Token;
        
        if(!token){
            res.status(500).json({MessCookie: `Cookie not found`})
        }else{
           
            const decode = await jwt.verify(token, process.env.JWT_SECRET) 
            req.userId = decode.userId;
            req.username = decode.username;
            next()
        }
        

    } catch (error) {
            res.status(404).json({Mess:`Token Authentication problem`})
    }
}


module.exports = authGurd;