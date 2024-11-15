const Employees = require('../model/employeeModel');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// CREATE EMPLOYEE
const createEmployee = async (req) => {
    try {
        let imagePath = null;
        if (req.file) {
            // Convert buffer to base64
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(dataURI, {
                folder: 'employee_images'
            });
            imagePath = result.secure_url;
        }

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
            // Convert buffer to base64
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(dataURI, {
                folder: 'employee_images'
            });
            imagePath = result.secure_url;
        } else {
            const employeeData = await Employees.findById(id);
            imagePath = employeeData.image;
        }
        
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
