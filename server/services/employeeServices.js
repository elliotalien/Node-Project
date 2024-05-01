const Employees = require('../model/employeeModel');
const multer = require('multer');
const asyncHandler = require('express-async-handler');


// CREATE EMPLOYEE
const createEmployee = async (req) => {
    try {
        const imagePath = req.file ? req.file.path : null;
        console.log('Image Path:', imagePath);

        const requiredFields = [
            "salutation", "firstName", "lastName", "email", "phone",
            "dob", "address", "gender", "qualifications", "state",
            "city", "country", "pinZip", "password", "username"
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                throw { status: 400, message: `Error: Missing ${field} field` };
            }
        }

        console.log('Request Body:', req.body); 

        const newEmployee = await Employees.create({
            ...req.body,
            image: imagePath,
        });

        return newEmployee;
    } catch (error) {
        throw handleError(error);
    }
};



// FIND EMPLOYEE
const findEmployee = async (req) => {
    const id = req.params.id;
    try {
        if (id) {
            const employee = await Employees.findById(id);
            if (!employee) {
                throw { status: 404, message: `Not found Employee with id ${id}` };
            }
            return employee;
        } else {
            const employees = await Employees.find();
            return employees;
        }
    } catch (error) {
        throw handleError(error);
    }
};

// UPDATE EMPLOYEE
const updateEmployee = async (req) => {
    try {
      const id = req.params.id;
      let imagePath;
  
      if (req.file) {
        imagePath = req.file.path;
      } else {
        const employeeData = await Employees.findById(id);
        console.log("Employee Data:", employeeData); 
        if (!employeeData) {
          throw { status: 404, message: `Employee not found with id ${id}` };
        }
        imagePath = employeeData.image;
      }
  
      console.log("Image Path:", imagePath);  
  
      const updateData = {
        ...req.body,
        image: imagePath,
      };
  
      console.log("Update Data:", updateData); 
  
      const updatedEmployee = await Employees.findByIdAndUpdate(id, updateData, { new: true, useFindAndModify: false });
      if (!updatedEmployee) {
        throw { status: 404, message: `Can't Update Employee with ${id}. Maybe employee not found` };
      }
      return updatedEmployee;
    } catch (error) {
      console.error("Backend error:", error);
      throw handleError(error);
    }
  };
  



// DELETE EMPLOYEE
const deleteEmployee = async (req) => {
    try {
        const id = req.params.id;
        const deletedEmployee = await Employees.findByIdAndDelete(id);
        if (!deletedEmployee) {
            throw { status: 404, message: `Can't Delete ${id}. Maybe id is wrong` };
        }
        return { message: "Employee was deleted successfully" };
    } catch (error) {
        throw handleError(error);
    }
};

const handleError = (error) => {
    if (error instanceof multer.MulterError) {
        return { status: 400, message: "Image upload error" };
    } else if (error.name === 'ValidationError') {
        return { status: 400, message: error.message };
    } else {
        return { status: 500, message: error.message || "Server error" };
    }
};


// Function to get all employees search
const searchEmployee = asyncHandler(async (req, res) => {
    try {
        const search = await Employees.find({
            $or: [
                { firstName: { $regex: req.params.key, $options: "i" } },
                { lastName: { $regex: req.params.key, $options: "i" } },
                { dob: { $regex: req.params.key, $options: "i" } },
                { email: { $regex: req.params.key, $options: "i" } },
                { phone: { $regex: req.params.key, $options: "i" } },
                { gender: { $regex: req.params.key, $options: "i" } },
            ],
        });
        if (search.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return search;
        // res.status(200).json({ search });
    } catch (error) {
        const handledError = handleError(error);
        res.status(handledError.status).json({ message: handledError.message });
    }
});



module.exports = { createEmployee, findEmployee, updateEmployee, deleteEmployee, searchEmployee ,handleError };




