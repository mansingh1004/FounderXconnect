// const express = require("express");
// const route = express.Router();

// const UserController = require("../controllers/userController");

// route.post("/registration", UserController.userRegistration);
// route.post("/login", UserController.userLogin);
// route.post("/authuser", UserController.userAuth);
// route.post("/forgotpassword",UserController.UserForgotPassword)
// route.post("/resetpassword/:token", ResetPassword);

// module.exports = route;








import express from "express";
import { 
    userRegistration, 
    userLogin, 
    userAuth, 
    UserForgotPassword, 
    ResetPassword 
} from "../controllers/userController.js";

const route = express.Router();

// Route definitions
route.post("/registration", userRegistration);
route.post("/login", userLogin);
route.post("/authuser", userAuth);
route.post("/forgotpassword", UserForgotPassword);
route.post("/resetpassword/:token", ResetPassword);

export default route;