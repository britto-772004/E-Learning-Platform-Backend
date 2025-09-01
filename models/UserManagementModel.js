const mongoose = require("mongoose");

const usermanagementSchema = new mongoose.Schema({
    emailId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    refreshtoken : {
        type : String,
        required : true,
        default : ""
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

});

const Usermanagement = mongoose.model("UserManagement",usermanagementSchema);

module.exports = {Usermanagement};  