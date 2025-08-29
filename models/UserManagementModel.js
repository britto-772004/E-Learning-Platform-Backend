const mongoose = require("mongoose");

const usermanagementSchema = new mongoose.Schema({
    emailId : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    role : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

});

const Usermanagement = mongoose.model("UserManagement",usermanagementSchema);

module.exports = {Usermanagement};  