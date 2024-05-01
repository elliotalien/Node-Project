let url = new URLSearchParams(document.location.search);
let employeeID = url.get("id");





// HTML ELEMENTS ID (START)

let employeeimage = document.getElementById("employeeimage");
let employeeFullname = document.getElementById("employeeFullname");
let employeeEmail = document.getElementById("employeeEmail");
let employeeGender = document.getElementById("employeeGender");
let employeeAge = document.getElementById("employeeAge");
let employeDob = document.getElementById("employeDob");
let employeePhone = document.getElementById("employeePhone");
let employeeQualification = document.getElementById("employeeQualification");
let employeeAddress = document.getElementById("employeeAddress");
let employeeUsername = document.getElementById("employeeUsername");


// HTML ELEMENTS ID (END)






// FETCH  DATA FROM SERVER (start)


fetch("http://localhost:8080/api/employees/" + employeeID)
  .then((employeedata) => {
    return employeedata.json();
  })
  .then((employeedatas) => {
    const uppercaseFullname = (
      employeedatas.salutation + " " +employeedatas.firstName +" " +employeedatas.lastName).toUpperCase();

    employeeFullname.innerHTML = uppercaseFullname;
    employeeEmail.innerHTML = employeedatas.email;
    employeeGender.innerHTML = employeedatas.gender;
    employeeAge.innerHTML = employeeAgeCalculate(employeedatas.dob);
    employeDob.innerHTML = employeedatas.dob;
    employeePhone.innerHTML = employeedatas.phone;
    employeeQualification.innerHTML = employeedatas.qualifications;
    employeeAddress.innerHTML = employeedatas.address;
    employeeUsername.innerHTML = employeedatas.username;
    employeeimage.src = employeedatas.image;
  });



// FETCH  DATA FROM SERVER (end)






// CALCULATING EMPLOYEE AGE (START)

function employeeAgeCalculate(birthDate) {
  let dob = birthDate.split("-");

  let dateofbirth = [];
  for (let j = 0; j < 3; j++) {
    dateofbirth.push(parseInt(dob[j]));
  }

  const currentDate = new Date();

  let age = currentDate.getFullYear() - dateofbirth[2];

  const hasBirthdayOccurred = currentDate.getMonth() < dateofbirth[1] ||(currentDate.getMonth() === dateofbirth[1] && currentDate.getDate() < dateofbirth[0]);

  if (!hasBirthdayOccurred) {
    age--;
  }

  return age;
}

// CALCULATING EMPLOYEE AGE (END)










let submitFormOpen = document.getElementById("EmployeeDetailsView");
let overlay = document.getElementById("overlay");



// FORM OPENING AND CLOSING START (START)





overlay.addEventListener("click", function () {
  closeForm(); 
  deleteEmployeeToastClose();
  window.location.href="/home";
});

function openForm() {
  submitFormOpen.classList.add("active");
  overlay.classList.add("active");
}

function closeForm() {
  submitFormOpen.classList.remove("active");
  overlay.classList.remove("active");
}




// FORM OPENING AND CLOSING START (END)






// FUNCTION TO VIEW AND EDIT EMPLOYEE DETAILS (START)
 

function viewEmployeeEdit() {
  fetch("http://localhost:8080/api/employees/" + employeeID)
    .then((employeedata) => {
      if (!employeedata.ok) {
        throw new Error("Error fetching employee data");
      }
      return employeedata.json();
    })
    .then((employeeEditdata) => {
      document.getElementById("salutation").value = employeeEditdata.salutation;
      document.getElementById("firstName").value = employeeEditdata.firstName;
      document.getElementById("lastName").value = employeeEditdata.lastName;
      document.getElementById("email").value = employeeEditdata.email;
      document.getElementById("phone").value = employeeEditdata.phone;
      document.getElementById("username").value = employeeEditdata.username;
      document.getElementById("dob").value = dateOfBirth(employeeEditdata.dob);
      document.getElementById("password").value = employeeEditdata.password;
      employeeEditdata.gender === "male"
        ? (document.getElementById("Male").checked = true)
        : (document.getElementById("Female").checked = true);
      document.getElementById("qualifications").value = employeeEditdata.qualifications;
      document.getElementById("address").value = employeeEditdata.address;
      document.getElementById("country").value = employeeEditdata.country;
      document.getElementById("state").value = employeeEditdata.state;
      document.getElementById("city").value = employeeEditdata.city;
      document.getElementById("pinZip").value = employeeEditdata.pinZip;
      document.getElementById("imagefile").src = employeeEditdata.image;
    })
    .catch((error) => {
      console.error("Error:", error);
    });


    // FUNCTION FOR DATEOFBRITH REVERSE

  function dateOfBirth(dob) {
    let formattedDate = dob.split("-").reverse().join("-");
    return formattedDate;
  }
}


// FUNCTION TO VIEW AND EDIT EMPLOYEE DETAILS (START)









let changeimage = document.getElementById("image-change");
let profileimage = document.getElementById("imagefile");


// IMAGE UPLOAD (start)


changeimage.addEventListener("change", function () {
  const [file] = changeimage.files;
  if (file) {
    profileimage.src = URL.createObjectURL(file);
  }
});

let imageFile = document.getElementById("image-change");

let profilePic;

imageFile.addEventListener("change", () => {
  profilePic = imageFile.files[0];
});


// IMAGE UPLOAD (end)




// FUNCTION TO ADD/UPLOAD PROFILE IMAGE (start)

async function addImage(imageFile) {
  const userData = adduser();
  const formData = new FormData();
  formData.append("image", imageFile);
  for (const [key, value] of Object.entries(userData)) {
    formData.append(key, value);
  }

  try {
    const res = await fetch("http://localhost:8080/api/employees/" + employeeID, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      console.log("Image updated successfully");
    } else {
      console.log("Failed to update image");
    }
  } catch (error) {
    console.error("PUT request error:", error);
  }
}

// FUNCTION TO ADD/UPLOAD PROFILE IMAGE (end)







// USER OBJECT FROM FORM INPUTS (start)


function adduser() {
  let user = {};
  user["salutation"] = document.getElementById("salutation").value;
  user["firstName"] = document.getElementById("firstName").value;
  user["lastName"] = document.getElementById("lastName").value;
  user["email"] = document.getElementById("email").value;
  user["phone"] = document.getElementById("phone").value;
  user["dob"] = dateofbirth(document.getElementById('dob').value);
  user["gender"] = genderSelect();
  user["qualifications"] = document.getElementById("qualifications").value;
  user["address"] = document.getElementById("address").value;
  user["city"] = document.getElementById("city").value;
  user["state"] = document.getElementById("state").value;
  user["country"] = document.getElementById("country").value;
  user["username"] = document.getElementById("username").value;
  user["password"] = document.getElementById("password").value;
  user["pinZip"] = document.getElementById("pinZip").value;

  return user;

  function dateofbirth(dob){
    let formattedDate = dob.split('-').reverse().join('-');
    return formattedDate;
  }
}


// USER OBJECT FROM FORM INPUTS (end)






// FUNCTION FOR EDITING EMPLOYEE DETAILS (start)


async function editing() {
  if (profilePic) {
    addImage(profilePic);
  }
  try {
    await fetch("http://localhost:8080/api/employees/" +employeeID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adduser()),
    });
  } catch (error) {
    console.error(error);
  }
}


// FUNCTION FOR EDITING EMPLOYEE DETAILS (end)








const deletebtns = document.getElementById("deletebox");
const deletes = document.getElementById("alert-box-delete");



// FUNCTION TO DELETE EMPLOYEE DATA (start)



function deleteData(employeeID) {
  deletebtns.style.display = "block";

  deletebtns.classList.add("active");
  overlay.classList.add("active");

  deletes.addEventListener("click", function () {
    fetch("http://localhost:8080/api/employees/" + employeeID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {});
  });
}



// Function to close the alert and hide elements

function closealert() {
  deletebtns.style.display = "none";

  deletebtns.classList.remove("active");
  overlay.classList.remove("active");
}

overlay.addEventListener("click", function () {
  closealert();
});




// FUNCTION TO DELETE EMPLOYEE DATA (end)











// GENDER SELECTING (start)

const genderSelect = () => {
  const male = document.getElementById('Male');
  const female = document.getElementById('Female');

  if (male.checked == true) {

      return male.value;
  } else {
      return female.value;
  }
}


// GENDER SELECTING (end)




 

// TOAST NOTIFICATIONS (START)



function editEmployeeToastOpen() {
  document.getElementById("editEmployeeToast").classList.add("active");
  closeForm(); 
}


function editEmployeeToastClose() {
document.getElementById("editEmployeeToast").classList.remove("active")
overlay.classList.remove("active");

}




// delete employee toast box


document.getElementById("alert-box-delete").addEventListener("click" , function (e) {
  closealert();
  deleteEmployeeToastOpen(); 
});


function deleteEmployeeToastOpen() {
  document.getElementById("deleteEmployeeToast").classList.add("active");
  overlay.classList.add("active");
 
}

function deleteEmployeeToastClose() {
  document.getElementById("deleteEmployeeToast").classList.remove("active");
  overlay.classList.remove("active");
}





// FORM VALIDATION (START)
function updateGenderValidation() {
  const maleRadio = document.getElementById("Male");
  const femaleRadio = document.getElementById("Female");
  const genderErrorMessageElement = document.getElementById("gender-error");

  if (maleRadio.checked || femaleRadio.checked) {
    genderErrorMessageElement.classList.remove("required");
    genderErrorMessageElement.innerHTML = "";
  }
}

function validateGender() {
  const maleRadio = document.getElementById("Male");
  const femaleRadio = document.getElementById("Female");
  const genderErrorMessageElement = document.getElementById("gender-error");

  if (!maleRadio.checked && !femaleRadio.checked) {
    genderErrorMessageElement.classList.add("required");
    genderErrorMessageElement.innerHTML = "Please select a gender";
    genderErrorMessageElement.style.color = "red";
    return false;
  } else {
    genderErrorMessageElement.classList.remove("required");
    genderErrorMessageElement.innerHTML = "";
    updateGenderValidation(); 
    return true;
  }
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone number validation function
function validatePhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

function validateField(inputId, errorMessage, requiredMessage) {
  let inputField = document.getElementById(inputId);
  let errorMessageElement = document.getElementById(`${inputId}-error`);

  // Remove the required message
  inputField.addEventListener("input", () => {
    errorMessageElement.classList.remove("required");
    inputField.style.border = "1px solid #E6E8EB";
    errorMessageElement.innerHTML = errorMessage;
    errorMessageElement.style.color = "#2B3674";
  });

  let inputValue = inputField.value;

  if (!inputValue) {
    // Highlight the required message
    errorMessageElement.classList.add("required");
    inputField.style.border = "1px solid red";
    inputField.focus();
    errorMessageElement.innerHTML = requiredMessage;
    errorMessageElement.style.color = "red";
    return false;
  } else if (inputField.type === "email" && !isValidEmail(inputValue)) {
    // Email validation
    errorMessageElement.classList.add("required");
    inputField.style.border = "1px solid red";
    inputField.focus();
    errorMessageElement.innerHTML = "Invalid email format";
    errorMessageElement.style.color = "red";
    return false;
  } else if (inputField.type === "tel" && !validatePhone(inputValue)) {
    // Phone number validation
    errorMessageElement.classList.add("required");
    inputField.style.border = "1px solid red";
    inputField.focus();
    errorMessageElement.innerHTML = "Invalid phone number format";
    errorMessageElement.style.color = "red";
    return false;
  } else {
    // Remove required styling
    errorMessageElement.classList.remove("required");
    inputField.style.border = "1px solid #E6E8EB";
    errorMessageElement.innerHTML = errorMessage;
    errorMessageElement.style.color = "#2B3674";
    return true;
  }
}

// Reset all required fields
function resetFields() {
  const fields = [
    {id: "salutation",message: "Salutation",requiredMessage: "Salutation is required"},
    {id: "firstName",message: "First Name",requiredMessage: "First Name is required"},
    {id: "lastName",message: "Last Name",requiredMessage: "Last Name is required"},
    {id: "email", message: "Email", requiredMessage: "Email is required" },
    {id: "phone",message: "Mobile Number",requiredMessage: "Mobile Number is required"},
    {id: "username",message: "Username",requiredMessage: "Username is required"},
    {id: "password",message: "Password",requiredMessage: "Password is required"},
    {id: "dob",message: "Date of Birth",requiredMessage: "Date of Birth is required"},
    {id: "qualifications",message: "Qualification",requiredMessage: "Qualification is required"},
    {id: "address",message: "Address",requiredMessage: "Address is required"},
    {id: "country",message: "Country",requiredMessage: "Country is required"},
    {id: "state", message: "State", requiredMessage: "State is required" },
    {id: "city", message: "City", requiredMessage: "City is required" },
    {id: "pinZip",message: "Pin/Zip",requiredMessage: "Pin/Zip is required"},
    {id: 'gender', message: '', requiredMessage: 'Please select a gender' },
  ];

  for (let field of fields) {
    const inputField = document.getElementById(field.id);
    const errorMessageElement = document.getElementById(`${field.id}-error`);

    if (inputField) {
      inputField.style.border = "1px solid #E6E8EB";

      const label = inputField.previousElementSibling;
      if (label) {
        label.innerHTML = field.message;
        label.style.color = "#2B3674";
      }

      if (errorMessageElement) {
        errorMessageElement.innerHTML = "";
        errorMessageElement.classList.remove("required");
      }
    }
  }

  const genderErrorMessageElement = document.getElementById("gender-error");
  genderErrorMessageElement.classList.remove("required");
  genderErrorMessageElement.innerHTML = "";
}

//  Add Employee button
document.getElementById("adduserbtn").addEventListener("click", function (e) {
  e.preventDefault(); 
    if (formValidation()) {
      editing(); 
      editEmployeeToastOpen(); 
      document.getElementById("overlay").classList.add("active");
  }
});


document.getElementById("Male").addEventListener("change", updateGenderValidation);
document.getElementById("Female").addEventListener("change", updateGenderValidation);


// Form validation function
function formValidation() {
  const fields = [
    { id: "salutation",message: "",requiredMessage: "Salutation is required"},
    { id: "firstName", message: "", requiredMessage: "First Name is required" },
    { id: "lastName", message: "", requiredMessage: "Last Name is required" },
    { id: "email", message: "", requiredMessage: "Email is required" },
    { id: "phone", message: "", requiredMessage: "Mobile Number is required" },
    { id: "username", message: "", requiredMessage: "Username is required" },
    { id: "password", message: "", requiredMessage: "Password is required" },
    { id: "dob", message: "", requiredMessage: "Date of Birth is required" },
    { id: "qualifications", message: "",requiredMessage: "Qualification is required"},
    { id: "address", message: "", requiredMessage: "Address is required" },
    { id: "country", message: "", requiredMessage: "Country is required" },
    { id: "state", message: "", requiredMessage: "State is required" },
    { id: "city", message: "", requiredMessage: "City is required" },
    { id: "pinZip", message: "", requiredMessage: "Pin/Zip is required" },
    { id: 'gender', message: '', requiredMessage: 'Please select a gender' },
  ];

  let isFormValid = true;

  for (let field of fields) {
    if (field.id === "gender") {
      if (!validateGender()) {
        isFormValid = false;
      }
    } else if (!validateField(field.id, field.message, field.requiredMessage)) {
      isFormValid = false;
    }
  }
  return isFormValid;
}

document.getElementById("overlay").addEventListener("click", resetFields);



