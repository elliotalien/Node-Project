const express = require('express');
const route = express.Router();
const controller = require('../controller/controller');
const upload = require('../config/multerConfig');


route.post('/api/employees',upload.single('image'),  controller.create); 
route.get('/api/employees', controller.find); 
route.get('/api/employees/:id', controller.findEmployee); 
route.put('/api/employees/:id', upload.single('image'), controller.update); 
route.delete('/api/employees/:id', controller.delete); 
route.get("/search/:key", controller.search);

module.exports = route;
