const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = async (payload)=>{
    const jwtSecretKey = process.env.jwtSecretKeyAccessToken;
    try{
        const token = await jwt.sign(payload,jwtSecretKey);
        return token;
    }
    catch(error){
        console.log("error in jwt token generation ",token);
        return null;
    }
    
};

const generateRefreshToken = async (payload)=>{
    const jwtSecretKey = process.env.jwtSecretKeyRefreshToken;
    try{
        const token = await jwt.sign(payload,jwtSecretKey);
        return token;
    }
    catch(error){
        console.log("error in jwt token generation ",token);
        return null;
    }
    
};

const validateToken = async (req ,res ,next)=>{

    const jwtSecretKey = process.env.jwtSecretKey;

    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        console.log("token is not sent");
        return res.json({message:"token is missing"});
    }
    try{
        const decodedtoken = await jwt.verify(token,jwtSecretKey);
        if(! decodedtoken ){
            console.log("invalid token");
            return res.status(400).json({message : "invalid token"});
        }
        req.user = decodedtoken;
        next();
    }
    catch(error){
        console.log("error in the token verification");
        return res.status(500).json({message : error});
    }
    

    
};

module.exports = {generateAccessToken,generateRefreshToken,validateToken};