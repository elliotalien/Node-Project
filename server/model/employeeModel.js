const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    salutation: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pinZip: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: "https://wallpapers.com/images/high/nezuko-pictures-dvs6iinigw20zdbw.webp",
    },
  },
  { timestamps: true } 
);

const Employees = mongoose.model("Employees", employeeSchema);

module.exports = Employees;
