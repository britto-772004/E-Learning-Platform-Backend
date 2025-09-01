const mongoose = require("mongoose");

const coursedetails = new mongoose.Schema({
    courseId : {
        type : String,
        unique : true,
        required : true
    },
    courseName : {
        type : String,
        required : true
    },
    teacherId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    teacherName : {
        type : String,
        required : true
    },
    courseDuration : {
        type : Number,
        required : true
    },
    StudentsEnrolled : {
        type : Number,
        required : true,
        default : 0
    },
    StudentsCompleted : {
        type :  Number,
        required : true,
        default : 0
    },
    mode : {
        type : String,
        enum : ["Free","Subscription"],
        required : true,
        default : "Free"
    },
    reviewStar : {
        type : Number,
        min : 0,
        max : 5,
        required : true,
        default : 0
    },
    peopleReviewCount : {
        type : Number,
        required : true,
        default : 0
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