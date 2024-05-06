const Employees = require('../model/employeeModel');
const multer = require('multer');


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

        const newEmployeeData = {
            ...req.body
        };
        
        if (imagePath) {
            newEmployeeData.image = imagePath;
        }

        const newEmployee = await Employees.create(newEmployeeData);

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

// search and pagination
const searchEmployee = async (searchKey, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;

        const search = await Employees.aggregate([
            {
                $match: {
                    $or: [
                        { firstName: { $regex: searchKey, $options: "i" } },
                        { lastName: { $regex: searchKey, $options: "i" } },
                        { dob: { $regex: searchKey, $options: "i" } },
                        { email: { $regex: searchKey, $options: "i" } },
                        { phone: { $regex: searchKey, $options: "i" } },
                        { gender: { $regex: searchKey, $options: "i" } },
                    ]
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]);

        if (search.length === 1) {
            return { search, page }; 
        }

        return { search, page };
        
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
};

module.exports = { createEmployee, findEmployee, updateEmployee, deleteEmployee, searchEmployee ,handleError };




