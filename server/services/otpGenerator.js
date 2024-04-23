const otpGenerator = require("otp-generator");

const generateOTP = () => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets:false,
    digits:true,
  });
  return OTP;
};

module.exports=generateOTP();




