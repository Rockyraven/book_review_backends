const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
  
const auth = (req, res, next) => {
    try{
        let token = req.headers.authorization;
        if(token){
            let user = jwt.verify(token, "SECRET_KEY");
            req.userId = user.id;
            console.log(user, "working", req.userId, token);
        }
        else{
            res.status(401).json({message: "unauthorization User"})
        }
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).json({message: "unauthorizted user"});
    }
}

module.exports = auth;