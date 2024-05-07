const asyncHandler = require("express-async-handler");
const userModels = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MailSender = require("../services/emailSender");
const otpGenerator = require("../services/otpGenerator");

let Email;
let HashPassword;
let Otp;
let token;
let ExpirationTime;
let Name;

// Get current user
const currentUser = asyncHandler(async (req, res) => {
  const userModel = await userModels.find();
  res.status(200).json({ userModel });
});



// Create user
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  let user = await userModels.findOne({ email });

  if (user) {
    req.session.notification = "User already exists. Please choose a different email.";
    return res.redirect("/signup");
  }


  if (email === "" || password === "" || name === "") {
    return res.redirect("/signup");
  }

  try {
    Email = email;
    const otp = otpGenerator;
    const expirationTime = new Date().getTime() + 5 * 60 * 1000;
    ExpirationTime = expirationTime;

    const secretKey = process.env.JWT_TOKEN + otp;
    const payload = {
      password,
      Email,
    };

    token = jwt.sign(payload, secretKey, { expiresIn: "5m" });
    
    const hashPassword = await bcrypt.hash(password, 10);
    HashPassword = hashPassword;
    Otp = otp;
    Name = name;

    const html = ` <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif;">

      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #00466a; text-align: center;">Email Verification</h1>
        <p style="font-size: 16px;">Please enter the below OTP to verify your email address:</p>
        <div style="background-color: #f0f0f0; padding: 10px 20px; border-radius: 5px; text-align: center; font-size: 24px; margin-bottom: 20px;">
          ${otp}
        </div>
        <p style="font-size: 16px;">This OTP is valid for 5 minutes.</p>
        <p style="font-size: 16px;">If you didn't request this, please ignore this email.</p>
        <p style="font-size: 16px;">Regards,<br>Stackup</p>
      </div>

    </body>
    </html>`;
    const title = "For Email verification ✅ ";
    MailSender(Email, html, title, { contentType: "text/html" });

    req.session.notification = `Email has been sent to your  ${Email}email address for verification.`;

    res.render("verifyUserEmail", {
      Email,
      err: "",
      ExpirationTime,
      title: "Email Verification ",
      notification: req.session.notification,
    });
  } catch (error) {
    res.status(400).json({ userModelserror: error.message });
  }
});

// Verify OTP
const verifyUserEmail = asyncHandler(async (req, res) => {
  const otpInput = req.body;
  const otpValue = otpInput.otpInput[0];
  const secretKey = process.env.JWT_TOKEN + otpValue;

  try {
    const verify = jwt.verify(token, secretKey);

    await userModels.create({
      name: Name,
      email: Email,
      password: HashPassword,
    });

    req.session.notification = "Email verified successfully.";
    res.redirect("/");

  } catch (error) {
    res.render("verifyUserEmail", {
      Email,
      err: "the OTP is invalid",
      ExpirationTime,
      title: "Email Verification",
    });
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModels.findOne({ email });

  let validation = true;

 
  if (!user || !(await bcrypt.compare(password, user.password))) {
    req.session.notification = "Email or password incorrect. Please try again.";
    return res.redirect("/"); 
  }


  if (validation) {
    req.session.isAuth = true;
    return res.redirect("/home");
  } else {
    res.status(401);
  }
});


// logout

const logout = asyncHandler(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/");
    }
  });
});

module.exports = {
  currentUser,
  createUser,
  loginUser,
  verifyUserEmail,
  logout,
};
