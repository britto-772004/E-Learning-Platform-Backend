
const mongoose = require("mongoose");
require("dotenv").config();


const connectDb = async (req ,res)=>{
    const mongodburl = process.env.mongodburl;
    await mongoose.connect(mongodburl)
    .then(()=>{console.log("mongodb connected to the backend")})
    .catch(()=>{console.log("error ")});
}

module.exports = {connectDb};