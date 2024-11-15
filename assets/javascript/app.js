// employee fetch
function employeeGet() {
  $.ajax({
    url: "https://employemanagement.vercel.app/api/employees",
    type: "GET",
    dataType: "json",
    success: function (objectData) {
      allemployee = objectData;
      pagination(allemployee);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

employeeGet();

// FETCHES EMPLOYEE DATA FROM THE SERVER (END)

// GENERATES DYNAMIC HTML TABLE FROM THE SERVER BASED DATA. (START)

function getEmployee(users) {
  let tableData = "";
  let slno = 1;
  users.forEach((user, index) => {
    tableData += `
            <tr>
            <td>#${slnumber(index + 1)}${index + 1}</td>
             <td><img src="${user.image}" alt="profile pic" class="rounded-circle employee-image mr-2" height="30" width="30"> ${user.salutation} ${user.firstName} ${user.lastName}</td>
             <td>${user.email}</td>
             <td>${user.phone}</td>
             <td>${user.gender}</td>
             <td>${user.dob}</td>
             <td>${user.country}</td>
             <td class="editing"> 
             <button type="button" class="delete-edit" onclick="toggleEmployeeSetup(this.nextElementSibling)" id="employeeSetupDiv"><i class="fa-solid fa-ellipsis"></i></button>
             <div class="employee-setup">
             <a href="ViewEmployee?id=${user._id}"><button class="btn-controls"><i class="fa-regular fa-eye"></i> View Details</button></a>
             <button onclick="getId('${user._id}');getUser()" class="btn-controls"><i class="fa-solid fa-pen"></i>Edit</button>
             <button type="button" class="btn-controls" onclick="deleteData('${user._id}')"><i class="fa-regular fa-trash-can"></i>Delete</button>
             </div>
             </td>
            </tr> `;
    slno++;
  });

  document.getElementById("table-body").innerHTML = tableData;
}

// GENERATES DYNAMIC HTML TABLE FROM THE SERVER BASED DATA. (END)


// SLNUMBER GENERATING FUNCTION (START)

function slnumber(num) {
  if (num < 10) {
    return 0;
  } else {
    return "";
  }
}

// SLNUMBER GENERATING FUNCTION (END)

// ADD EMPLOYEE FORM OPENING (START)

let submitFormOpen = document.getElementById("form-box");
let overlay = document.getElementById("overlay");

overlay.addEventListener("click", function () {
  closeForm(); // formclosing function
  deleteEmployeeToastClose(); // Delete employee toast box
  editEmployeeToastClose(); // Edit employee toast box
  addemployeeCloseToast(); // Add employee toast box
});

let elements = document.getElementsByClassName("employtable-data");

function openForm() {
  document.getElementById("previewimage").style.display = "none";
  document.getElementById("imageuploding-box").style = "block";

  dataRemove(); // data removing function

  submitFormOpen.classList.add("active");
  overlay.classList.add("active");
}

function closeForm() {
  submitFormOpen.classList.remove("active");
  overlay.classList.remove("active");
  resetFields();
}

document.getElementById("Cancel-btn").addEventListener("click", function (e) {
  e.preventDefault();
  closeForm();
  resetFields();
});

// ADD EMPLOYEE FORM OPENING (END)

// VIEW EMPLOYEE EDIT EMPLOYEE DELETE EMPLOYE POPUP (START)

const toggleEmployeeSetup = (button) => {
  button.style.display = button.style.display === "block" ? "none" : "block";

  let invisibleOverlay = document.getElementById("invisible");
  let employeeSetupDiv = document.getElementById("employeeSetupDiv");

  employeeSetupDiv.classList.add("active");
  invisibleOverlay.classList.add("active");

  invisibleOverlay.addEventListener("click", function () {
    closeEmployeeSetup();
  });

  function closeEmployeeSetup() {
    employeeSetupDiv.classList.remove("active");
    invisibleOverlay.classList.remove("active");
    button.style.display = "none";
  }
};

// VIEW EMPLOYEE EDIT EMPLOYEE DELETE EMPLOYE POPUP (END)

// FORM ALL DATA CLEARING FUNCTION (START)

const dataRemove = () => {
  document.getElementById("adduserbtn").style.display = "block";
  document.getElementById("changeemployee").style.display = "none";
  document.getElementById("changeform").textContent = "Add Employee";

  document.getElementById("salutation").value = "";
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("dob").value = "";
  Male.checked = false;
  Female.checked = false;
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("qualifications").value = "";
  document.getElementById("address").value = "";
  document.getElementById("country").value = "";
  document.getElementById("state").value = "";
  document.getElementById("city").value = "";
  document.getElementById("pinZip").value = "";
};
// FORM ALL DATA CLEARING FUNCTION (END)

//EMPLOYEE GENDER SELECTION FUNCTION (START)

const genderSelect = () => {
  const male = document.getElementById("Male");
  const female = document.getElementById("Female");

  if (male.checked == true) {
    return male.value;
  } else {
    return female.value;
  }
};

//EMPLOYEE GENDER SELECTION FUNCTION (END)

// posting employees details into table
function adduser() {
  let user = {};
  user["salutation"] = document.getElementById("salutation").value;
  user["firstName"] = document.getElementById("firstName").value;
  user["lastName"] = document.getElementById("lastName").value;
  user["email"] = document.getElementById("email").value;
  user["phone"] = document.getElementById("phone").value;
  user["dob"] = dateofbirth(document.getElementById("dob").value);
  user["gender"] = genderSelect();
  user["qualifications"] = document.getElementById("qualifications").value;
  user["address"] = document.getElementById("address").value;
  user["country"] = document.getElementById("country").value;
  user["state"] = document.getElementById("state").value;
  user["city"] = document.getElementById("city").value;
  user["pinZip"] = document.getElementById("pinZip").value;
  user["username"] = document.getElementById("username").value;
  user["password"] = document.getElementById("password").value;

  return user;

  function dateofbirth(dob) {
    let Date = dob.split("-").reverse().join("-");
    return Date;
  }
}

let userId;

function getId(id) {
  userId = id;
}

async function getUser() {
  try {
    openForm();

    document.getElementById("imageuploding-box").style.display = "none";
    document.getElementById("previewimage").style.display = "block";

    // edit form

    document.getElementById("adduserbtn").style.display = "none";
    document.getElementById("changeemployee").style.display = "block";
    document.getElementById("changeform").textContent = "Edit Employee";

    // fetch edit data

    const res = await fetch("https://employemanagement.vercel.app/api/employees/" + userId);
    const data = await res.json();

    document.getElementById("salutation").value = data.salutation;
    document.getElementById("firstName").value = data.firstName;
    document.getElementById("lastName").value = data.lastName;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;
    document.getElementById("dob").value = dateofbirth(data.dob);
    data.gender === 'Male' ? Male.checked = true : Female.checked = true;
    document.getElementById("username").value = data.username;
    document.getElementById("password").value = data.password;
    document.getElementById("qualifications").value = data.qualifications;
    document.getElementById("address").value = data.address;
    document.getElementById("country").value = data.country;
    document.getElementById("state").value = data.state;
    document.getElementById("city").value = data.city;
    document.getElementById("pinZip").value = data.pinZip;
    document.getElementById("imagefile").src = data.image;
  } catch (error) {
    console.log(error);
  }

  function dateofbirth(dob) {
    let Date = dob.split("-").reverse().join("-");
    return Date;
  }
}

// function for posting Employee data to the server

let employeeDpImage = document.getElementById("image-change");
let addEmployeeInputbox = document.getElementById("imageuploadbox");

let profilePicEmployeeDp;
let profilePicAddEmployee;

employeeDpImage.addEventListener("change", () => {
  profilePicEmployeeDp = employeeDpImage.files[0];
});

addEmployeeInputbox.addEventListener("change", () => {
  profilePicAddEmployee = addEmployeeInputbox.files[0];
});

let userImage = document.getElementById("imagefile");
let userImageInputbox = document.getElementById("imageuploadbox");

userImageInputbox.addEventListener("change", function () {
  document.getElementById("imageuploding-box").style.display = "none";
  document.getElementById("previewimage").style.display = "block";

  const [file] = userImageInputbox.files;
  if (file) {
    userImage.src = URL.createObjectURL(file);
  }
});


// post employee
async function postuser() {
  try {
    const userData = adduser();
    const imageFileInput = document.getElementById("imageuploadbox");

    const formData = new FormData();
  
    if (imageFileInput && imageFileInput.files && imageFileInput.files.length > 0) {
      const imageFile = imageFileInput.files[0];
      formData.append("image", imageFile);
    }

    for (const [key, value] of Object.entries(userData)) {
      formData.append(key, value);
    }

    const response = await fetch("https://employemanagement.vercel.app/api/employees", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();
    console.log(responseData);

    addemployeeOpenToast();
  } catch (error) {
    console.log(error);
  }
}


//  EMPLOYEE EDITING / PUT (START)
async function editing() {
  if (profilePic) {
    addImage(profilePic);
  }
  try {
    await fetch("https://employemanagement.vercel.app/api/employees/" + userId, {
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



async function addImage(imageFile) {
  const userData = adduser();
  const formData = new FormData();
  formData.append("image", imageFile);
  for (const [key, value] of Object.entries(userData)) {
    formData.append(key, value);
  }

  try {
    const res = await fetch("https://employemanagement.vercel.app/api/employees/" + userId, {
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

//  EMPLOYEE EDITING / PUT (END)

const deletebtns = document.getElementById("deletebox");
const deletes = document.getElementById("alert-box-delete");

// EMPLOYEE DELETE (START)

function deleteData(id) {
  deletebtns.style.display = "block";

  deletebtns.classList.add("active");
  document.getElementById("overlay").classList.add("active");

  deletes.addEventListener("click", function () {
    fetch("https://employemanagement.vercel.app/api/employees/" + id, {
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
  document.getElementById("overlay").classList.remove("active");
}

document.getElementById("overlay").addEventListener("click", function () {
  closealert();
});

// EMPLOYEE DELETE (END)

// ADD EMPLOYEE FORM IMAGE PREVIEW (END)

// UPDATE EMPLOYEE IMAGE PREVIEW AND UPDATING OF IMAEG (END)

let imageFile = document.getElementById("image-change");

let profilePic;

imageFile.addEventListener("change", () => {
  profilePic = imageFile.files[0];
});

let changeimage = document.getElementById("image-change");
let profileimage = document.getElementById("imagefile");

// image previewing in edit employee form

changeimage.addEventListener("change", function () {
  const [file] = changeimage.files;
  if (file) {
    profileimage.src = URL.createObjectURL(file);
  }
});




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

  // Reset gender validation
  const genderErrorMessageElement = document.getElementById("gender-error");
  genderErrorMessageElement.classList.remove("required");
  genderErrorMessageElement.innerHTML = "";
}

// Event listener for Add Employee button
document.getElementById("adduserbtn").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent form submission
  if (formValidation()) {
    addemployeeOpenToast(); // Display success message
    closeForm(); // Close the form
    postuser(); // Send data to server
    overlay.classList.add("active"); // Show overlay
  }
});

// Event listener for Save Changes button
document
  .getElementById("changeemployee")
  .addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
    if (formValidation()) {
      editEmployeeToastOpen(); // Display success message
      closeForm(); // Close the form
      editing(); // Send edited data to server
      overlay.classList.add("active"); // Show overlay
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

// // FORM VALIDATION (START)







// WEBSITE PAGINATION (START)
var indexvalue = 0;
var allemployee;
var totalPages;
var pageul = document.querySelector(".paginationbtn");
var employeePerpage = document.getElementById("employeePerpage");

employeePerpage.addEventListener("change", selectpage);

function selectpage() {
    indexvalue = 0;
    pagination(allemployee);
}

function pagination(employeelist) {
    var itemperpage = parseInt(employeePerpage.value);
    var totalItems = employeelist.length;
    totalPages = Math.ceil(totalItems / itemperpage);

    var currentPageData = employeelist.slice(
        indexvalue,
        indexvalue + itemperpage
    );

    // Assuming getEmployee function is defined elsewhere to display employees
    getEmployee(currentPageData);

    renderPagination();
}

function renderPagination() {
    pageul.innerHTML = "";

    var prevButton = createPaginationButton("previousPage", '<i class="fa fa-angle-left"></i>', function () {
        if (indexvalue > 0) {
            indexvalue -= parseInt(employeePerpage.value);
            pagination(allemployee);
        }
    });
    pageul.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        var li = document.createElement("li");
        li.textContent = i;
        li.addEventListener("click", function () {
            indexvalue = (i - 1) * parseInt(employeePerpage.value);
            pagination(allemployee);
            updateActivePage();
        });
        pageul.appendChild(li);
    }

    var nextButton = createPaginationButton("nextPage", '<i class="fa fa-angle-right"></i>', function () {
        if (indexvalue + parseInt(employeePerpage.value) < allemployee.length) {
            indexvalue += parseInt(employeePerpage.value);
            pagination(allemployee);
            updateActivePage();
        }
    });
    pageul.appendChild(nextButton);

    updateActivePage();
}

function createPaginationButton(className, innerHTML, onClickFunction) {
    var button = document.createElement("li");
    button.className = className;
    button.innerHTML = innerHTML;
    button.addEventListener("click", onClickFunction);
    return button;
}

function updateActivePage() {
    var paginationList = document.getElementById("paginationList");
    var listItems = paginationList.getElementsByTagName("li");

    for (var i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove("active");
    }

    listItems[indexvalue / parseInt(employeePerpage.value) + 1].classList.add(
        "active"
    );
}

function searchEmployee() {
  const searchValue = document.getElementById("searchUser").value.toLowerCase();
  const currentPage = 1; 
  const itemsPerPage = parseInt(employeePerpage.value); 

  if (searchValue) {
      fetch(`https://employemanagement.vercel.app/search/${searchValue}?page=${currentPage}&limit=${itemsPerPage}`)
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Server error: " + response.statusText);
              }
              return response.json();
          })
          .then((data) => {
              const searchResults = data.search;
              const currentPage = data.page;
              pageul.innerHTML = "";

              if (searchResults.length === 1) {
                  getEmployee(searchResults); 
              } else {
                  getEmployee(searchResults); 
                  renderPagination(currentPage, itemsPerPage);
              }
          })
          .catch((error) => {
              console.error("Error:", error.message);
          });
  } else {
      getEmployee(); 
  }
}



// EMPLOYEE SEARCHING (END)

// FULL TOAST BOX CODE

function addemployeeOpenToast() {
  document.getElementById("addEmployeeToast").classList.add("active");
}

function addemployeeCloseToast() {
  document.getElementById("addEmployeeToast").classList.remove("active");
  employeeGet();
  overlay.classList.remove("active");
}

// edit employee toast box

function editEmployeeToastOpen() {
  document.getElementById("editEmployeeToast").classList.add("active");
}

function editEmployeeToastClose() {
  document.getElementById("editEmployeeToast").classList.remove("active");
  employeeGet();
  overlay.classList.remove("active");
}

// delete employee toast box

document
  .getElementById("alert-box-delete")
  .addEventListener("click", function (e) {
    closealert();
    deleteEmployeeToastOpen();
  });

function deleteEmployeeToastOpen() {
  document.getElementById("deleteEmployeeToast").classList.add("active");
  overlay.classList.add("active");
}

function deleteEmployeeToastClose() {
  document.getElementById("deleteEmployeeToast").classList.remove("active");
  employeeGet();
  overlay.classList.remove("active");
}
