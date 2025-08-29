const express = require("express");
const {courseEnroll,removeEnrolled,getAllEnrolledCourses,getCompletedCourses,getIncompletedCourses} = require("../controller/CourseEnrollment");
const { validateToken } = require("../middleware/token");

const route = express.Router();

// course routes

route.post("/courseEnroll",validateToken,courseEnroll);
route.delete("/removeEnrolled",validateToken,removeEnrolled);
route.get("/getAllEnrolledCourses",validateToken,getAllEnrolledCourses);
route.get("/getCompletedCourses",validateToken,getCompletedCourses);
route.get("/getIncompletedCourses",validateToken,getIncompletedCourses);

module.exports = route;