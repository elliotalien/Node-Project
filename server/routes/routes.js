const express = require('express');
const route = express.Router();
const { HomeRoute, SignupRoute, LoginRoutes, ViewEmployeeRoutes ,verifyUserEmail } = require('../controller/renderPage')
const isAuthenticated = require("../services/authentication");


route.get("/home",isAuthenticated,HomeRoute)
route.get("/signup",SignupRoute)
route.get("/",LoginRoutes)
route.get("/viewEmployee",isAuthenticated,ViewEmployeeRoutes)
route.get("/verifyUserEmail",verifyUserEmail)

module.exports = route ;