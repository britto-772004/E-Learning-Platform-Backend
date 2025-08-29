const {CourseEnrolledDetails} = require("../models/CourseEnrollmentDetails");

const courseEnroll = async (req ,res)=>{
    const emailId = req.user.emailId;

    const courseId = req.query.courseId;
    try{

        let result = await CourseEnrolledDetails.findOne({emailId:emailId,courseId:courseId});
        if(result){
            console.log("Already enrolled the course");
            return res.status(400).json({success :false , message : "Already enrolled the course"});
        } 

        const data = {
            emailId : emailId,
            courseId : courseId,
            isCompleted : false
        };
        result = await CourseEnrolledDetails.create(data);
        console.log("course enrolled ..");
        return res.status(201).json({success: true,message:"course enrolled ",result:result});
    }
    catch(error){
        console.log("error in database");
        return res.status(500).json({success:false,message : "error in the database"});
    }

};

const getAllEnrolledCourses = async (req,res)=>{
    const emailId = req.user.emailId;

    try{
        let result = await CourseEnrolledDetails.find({emailId:emailId}).sort({createdAt : -1});
        if(!result){
            console.log("no course enrolled.");
            return res.status(400).json({success : false,message : "no course enrolled"});
        }
        console.log("fetched successfully");
        return res.status(200).json({success : true,message : "fetched successfully ",result : result});
    }
    catch(error){
        console.log("error in database");
        return res.status(500).json({success:false,message : "error in the database"});
    }
};

const getCompletedCourses = async (req,res)=>{
    const emailId = req.user.emailId;

    try{
        const result = await CourseEnrolledDetails.find({emailId:emailId,isCompleted: true});
        if(result.length === 0){
            console.log("no course completed");
            return res.status(400).json({success : false,message : "no course completed"});
        }
        console.log("fetched successfully");
        return res.status(200).json({success : true,message : "fetched successfully",result : result});
    }
    catch(error){
        console.log("error in database");
        return res.status(500).json({success:false,message : "error in the database"});
    }

};

const getIncompletedCourses = async (req,res)=>{
    const emailId = req.user.emailId;

    try{
        const result = await CourseEnrolledDetails.find({emailId:emailId,isCompleted: false});
        if(result.length === 0){
            console.log("no course Incompleted");
            return res.status(400).json({success : false,message : "no course Incompleted"});
        }
        console.log("fetched successfully");
        return res.status(200).json({success : true,message : "fetched successfully",result : result});
    }
    catch(error){
        console.log("error in database");
        return res.status(500).json({success:false,message : "error in the database"});
    }
}

const removeEnrolled = async (req,res)=>{
    const courseId = req.query.courseId;
    const emailId = req.user.emailId;

    try{
        let result = await CourseEnrolledDetails.findOne({courseId : courseId,emailId : emailId});
        if(!result){
            console.log("you not enrolled the course..");
            return res.status(400).json({success : false,message :"you not enrolled the course.." });
        }

        result = await CourseEnrolledDetails.findOneAndDelete({courseId:courseId,emailId:emailId});
        console.log("enrolled course removed successfully");
        return res.status(200).json({success : true,message : "enrolled course removed successfully"});

    }
    catch(error){
        console.log("error in database");
        return res.status(500).json({success:false,message : "error in the database"});
    }
};

module.exports = {courseEnroll,removeEnrolled,getAllEnrolledCourses,getCompletedCourses,getIncompletedCourses};