const jwt = require("jsonwebtoken")


module.exports = function(req, res, next){
    const authHeader = req.headers.authorizaion;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: 'no token Provided'})
    }

    const token = authHeader.split[' '][1];
   try{
        const decode = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = decode.userId
        next();

   }catch(err){

      return res.status(401).json({ message: 'Token is not valid' });
    
   }

}