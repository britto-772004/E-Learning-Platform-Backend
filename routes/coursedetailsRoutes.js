const express = require("express");
const {createCourse,getAllCourse,getOneCourse,editCourse,deleteCourse} = require("../controller/CourseDetails");
const { validateToken } = require("../middleware/token");
const route = express.Router();

// courses operation
route.post("/createCourse",validateToken,createCourse);
route.get("/getAllCourse",validateToken,getAllCourse);
route.get("/getOneCourse",validateToken,getOneCourse);
route.patch("/editCourse",validateToken,editCourse);
route.delete("/deleteCourse",validateToken,deleteCourse);

module.exports = route;