const employeeService = require("../services/employeeServices");
const { handleError } = require("../services/employeeServices");
const Employee = require("../model/employeeModel")

exports.create = async (req, res) => {
  try {
    const data = await employeeService.createEmployee(req);
    res.status(201).send(data);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "Some error occurred during create operation",
    });
  }
};

exports.find = async (req, res) => {
  try {
    const data = await employeeService.findEmployee(req);
    res.send(data);
  } catch (error) {
    res.status(error.status || 500).send({
      message:
        error.message || "Error Occurred while retrieving employee information",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await employeeService.updateEmployee(req);
    res.send(data);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "Error updating Employee information",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await employeeService.deleteEmployee(req);
    res.send({ message: "Employee was deleted successfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ message: error.message || "Could not delete Employee" });
  }
};

exports.findEmployee = async (req, res) => {
  try {
    const data = await employeeService.findEmployee(req);
    const employeesWithImagePaths = Array.isArray(data)
      ? data.map((employee) => ({
          ...employee._doc,
          image: `${employee.image}`,
        }))
      : { ...data._doc, image: `${data.image}` };
    res.status(200).json(employeesWithImagePaths);
  } catch (error) {
    const errorMessage = handleError(error);
    res
      .status(errorMessage.status || 500)
      .json({ message: errorMessage.message });
  }
};


exports.search = async (req, res) => {
  try {
    const { key } = req.params;
    const { page, limit } = req.query;
    
    const searchResults = await employeeService.searchEmployee(key, parseInt(page), parseInt(limit));
    
    res.status(200).json(searchResults); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Internal server error" }); 
  }
};





// users controller

const userService = require("../services/userServices");

exports.currentUser = (req, res) => {
  userService
    .currentUser(req, res)
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.createUser = (req, res) => {
  userService
    .createUser(req, res)
    .catch((err) => res.status(400).json({ message: err.message }));
};

exports.loginUser = (req, res) => {
  userService
    .loginUser(req, res)
    .catch((err) => res.status(400).json({ message: err.message }));
};

exports.verifyUserEmail = (req, res) => {
  userService
    .verifyUserEmail(req, res)
    .catch((err) => res.status(400).json({ message: err.message }));
};
