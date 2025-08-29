const mongoose = require("mongoose");

const coursedetails = new mongoose.Schema({
    courseId : {
        type : String,
        unique : true,
        require : true
    },
    courseName : {
        type : String,
        require : true
    },
    teacherId :{
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    teacherName : {
        type : String,
        require : true
    },
    courseDuration : {
        type : Number,
        require : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
});

const Coursedetails = mongoose.model("Coursedetails",coursedetails);

module.exports = {Coursedetails}