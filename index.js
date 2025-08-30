const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const usermanagement = require("./routes/UserManagementroutes");
const courses = require("./routes/coursedetailsRoutes");
const enrollcourses = require("./routes/CourseEnrollmentDetailsRoutes");
const { connectDb } = require("./config/database");

app.use(express.json());
app.use(cors({origin : "*"}));

// signup and login
app.use("/api/otp",usermanagement);

// add courses
app.use("/api/course",courses);

// enroll courses 
app.use("/api/enrollCourse",enrollcourses);

const port = process.env.port;

app.listen(port,()=>{
    connectDb();
    console.log("backend is live");
})