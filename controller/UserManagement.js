const {Usermanagement} = require("../models/UserManagementModel");
const bcrypt = require("bcrypt");

const {generateToken} = require("../middleware/token");

const signUp = async (req ,res)=>{
    const emailId = req.query.emailId;
    const password = req.query.password;
    const role = req.query.role;

    try{
        let result = await Usermanagement.findOne({emailId:emailId});
        if(result){
            console.log("already registered");
            return res.status(400).json({success : false,message : "already registered"});
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const data = {
            emailId : emailId,
            password : hashedpassword,
            role : role
        }
        result = await Usermanagement.create(data);
        console.log(`user registered ${emailId}`);
        return res.status(201).json({success:true,message:"User registered successfully "});
    }
    catch(error){
        console.log("error in the database fetching");
        return res.status(500).json({success : false , message : error});
    }
};

const signIn = async (req,res)=>{
    const emailId = req.query.emailId;
    const password = req.query.password;
    try{
        const result = await Usermanagement.findOne({emailId: emailId});
        if(!result){
            console.log("kindly register");
            return res.status(400).json({success:false,message : "kindly registered"});
        }

        if(! await bcrypt.compare(password,result.password)){
            console.log("Password is wrong");
            return res.status(400).json({success : false,message : "password is wrong"});
        }
        console.log("Authenticated user");
        const payload = {
            emailId : result.emailId,
            role : result.role,
            id : result._id
        }
        const token = await generateToken(payload);
        return res.status(200).json({success : true,message : "authenticated user",token : token});


    }
    catch(error){
        console.log("error in the database fetching");
        return res.status(500).json({success : false , message : error});
    }
};

module.exports = {signIn,signUp};