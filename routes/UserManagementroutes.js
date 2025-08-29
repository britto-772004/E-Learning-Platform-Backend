const express = require("express");
const { signUp, signIn } = require("../controller/UserManagement");

const route = express.Router();

route.post("/signUp",signUp);
route.get("/signIn",signIn);

module.exports = route;