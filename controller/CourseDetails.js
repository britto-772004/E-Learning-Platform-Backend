
const {Coursedetails} = require("../models/CourseDetailsModel");

const createCourse = async (req ,res)=>{
    const userRole = req.user.role;
    console.log("payload : ",req.user);
    if(userRole !== "Teacher"){
        console.log("permission denied");
        return res.status(400).json({success :false,message : "Permission denied"});
    }

    // const {courseId,courseName,courseDuration,teacherName} = req.body;
    const data = req.body;

    try{
        // let data = {
        //     courseId : courseId,
        //     courseName : courseName,
        //     teacherId : req.user.id,
        //     teacherName : teacherName,
        //     courseDuration : courseDuration
        // };

        console.log("data : ",data);

        const result = await Coursedetails.findOne({courseId : data.courseId});
        if(result){
            console.log("course already created ");
            return res.status(400).json({success : false,message : "already created"});
        }

        await Coursedetails.create(data);
        console.log("course created");
        return res.status(201).json({success : true,message : "course created"});
    }
    catch(error){
        console.log("error : ",error);
        return res.status(500).json({success : false, error : error});
    }

};

const getAllCourse = async (req,res)=>{
    try{
        const result = await Coursedetails.find();
        console.log("data fetched successfully ");
        return res.status(200).json({success : true,message : " data fetch successfully ",result : result});
    
    }
    catch(error){
        console.log("error : ",error);
        return res.status(500).json({success : false, error : error});
    }
};

const getOneCourse = async (req,res)=>{
    const courseId = req.query.courseId;

    try{
        const result = await Coursedetails.findOne({courseId : courseId});
        if(!result){
            console.log("no course found");
            return res.status(400).json({success : false,message : "no course found"});
        }
        console.log("fetched successfully");
        return res.status(200).json({success: true,message : "Fetched successfully",result : result});
    }
    catch(error){
        console.log("error in the database fetching");
        return res.status(500).json({success : false , message : error});
    }
};

const editCourse = async (req,res)=>{

    const userRole = req.user.role;
    if(userRole !== "Teacher"){
        console.log("permission denied");
        return res.status(400).json({success:false,message : "permission denied"});
    } 
    const courseId = req.query.courseId;

    const updates = req.body;

    try{
        updates.updatedAt = Date.now();
        const result = await Coursedetails.findOneAndUpdate(
            {courseId : courseId},
            {$set : updates},
            {new : true}
        );

        if(!result){
            console.log("no course found");
            return res.status(400).json({success : false,message: "no course found"});
        }
        console.log("successfully updated",updates);
        return res.status(200).json({success : true,message : "successfully updated",result : result});
    }
    catch(error){
        console.log("error in the database fetching");
        return res.status(500).json({success : false , message : error});
    }
};

const deleteCourse = async (req,res)=>{
    const userRole = req.user.role;
    if(userRole !== "Teacher"){
        console.log("permission denied");
        return res.status(400).json({success:false,message : "permission denied"});
    }
    const courseId = req.query.courseId;
    try{
        const result = await Coursedetails.findOneAndDelete({courseId:courseId});
        console.log("successfully deleted");
        return res.status(200).json({success:true,message : "successfully deleted",result: result});
    }
    catch(error){
        console.log("error in the database fetching");
        return res.status(500).json({success : false , message : error});
    }
};

module.exports = {createCourse,getAllCourse,getOneCourse,editCourse,deleteCourse};