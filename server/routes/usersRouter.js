const express = require('express');
const route = express.Router();
const controller = require('../controller/controller');
const {logout} = require('../services/userServices')


route.get("/current",controller.currentUser);
route.post("/",controller.createUser);
route.post("/loginUser",controller.loginUser);
route.post("/verifyUserEmail",controller.verifyUserEmail);
route.post("/logout",logout);


module.exports = route ;