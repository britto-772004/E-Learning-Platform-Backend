const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseId : {
        type : String,
        require : true
    },
    emailId : {
        type : String,
        require : true
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const CourseEnrolledDetails = mongoose.model("CourseEnrolledDetails",courseSchema);
module.exports = {CourseEnrolledDetails};