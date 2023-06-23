const contentContainer = document.querySelector("#contentContainer");
const addUserLink = document.querySelector("#addUserLink");
const showUsersLink = document.querySelector("#showUsersLink");
const formContainer = document.querySelector(".form-container");
const cardContainer = document.querySelector("#cardContainer");
const personsList = document.querySelector("#personsList");
const personsTable = document.querySelector("#personsTable");


let personsData = [];




// Validate email format
function validateEmail(email) {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
}


// Validate mobile number format
 function validateMobile(mobile) {
    const mobileRegex = /^\(\d{3}\)-\d{3}-\d{4}$/;
    return mobileRegex.test(mobile);
  }

// Validate pincode/zipcode format
function validatePincode(pincode) {
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(pincode);
}

// Validate date of birth (above 18 years)
function validateDateOfBirth(dob) {
  const currentDate = new Date();
  const inputDate = new Date(dob);
  const ageDifference = currentDate.getFullYear() - inputDate.getFullYear();
  const monthDifference = currentDate.getMonth() - inputDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < inputDate.getDate())) {
    return ageDifference - 1;
  }
  return ageDifference;
}

// Add a person to the persons data
function addPerson(person) {
  personsData.push(person);
}

// Clear form inputs
function clearFormInputs() {
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#dob").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#mobile").value = "";
  document.querySelector("#city").value = "";
  document.querySelector("#pincode").value = "";
}


// Render the persons data in cards
function renderPersonsData() {
  cardContainer.innerHTML = "";
  personsData.forEach((person) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${person.firstName} ${person.lastName}</h3>
      <p><strong>Date of Birth:</strong> ${person.dob}</p>
      <p><strong>Email:</strong> ${person.email}</p>
      <p><strong>Mobile Number:</strong> ${person.mobile}</p>
      <p><strong>City:</strong> ${person.city}</p>
      <p><strong>Pincode/Zipcode:</strong> ${person.pincode}</p>
    `;
    cardContainer.appendChild(card);
  });
}

// Render the persons data in table
function renderPersonsTable() {
  personsList.innerHTML = "";
  personsData.forEach((person) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${person.firstName}</td>
      <td>${person.lastName}</td>
      <td>${person.dob}</td>
      <td>${person.email}</td>
      <td>${person.mobile}</td>
      <td>${person.city}</td>
      <td>${person.pincode}</td>
    `;
    personsList.appendChild(row);
  });
}





// Search persons data based on first name
function searchPersonsData(searchTerm) {
  const filteredData = personsData.filter((person) => {
    const fullName = `${person.firstName} ${person.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return filteredData;
}

// Event listener for Add User link
addUserLink.addEventListener("click", function(event) {
  event.preventDefault();
  switchToAddUserSection();
});

// Event listener for Show Users link
showUsersLink.addEventListener("click", function(event) {
  event.preventDefault();
  switchToShowUsersSection();
});

// Form submission event listener
document.getElementById("personForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Clear previous error messages
  const errorElements = document.getElementsByClassName("error");
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = "";
  }

  // Validate form inputs
  let isValid = true;

  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const dobInput = document.getElementById("dob");
  const emailInput = document.getElementById("email");
  const mobileInput = document.getElementById("mobile");
  const cityInput = document.getElementById("city");
  const pincodeInput = document.getElementById("pincode");

  if (firstNameInput.value.trim() === "") {
    document.getElementById("firstNameError").textContent = "First Name is required";
    isValid = false;
  }

  if (lastNameInput.value.trim() === "") {
    document.getElementById("lastNameError").textContent = "Last Name is required";
    isValid = false;
  }

  if (dobInput.value.trim() === "") {
    document.getElementById("dobError").textContent = "Date of Birth is required";
    isValid = false;
  } else if (validateDateOfBirth(dobInput.value.trim()) < 18) {
    document.getElementById("dobError").textContent = "Must be at least 18 years old";
    isValid = false;
  }

  if (emailInput.value.trim() === "") {
    document.getElementById("emailError").textContent = "Email is required";
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    document.getElementById("emailError").textContent = "Invalid email format";
    isValid = false;
  }

  if (mobileInput.value.trim() === "") {
    document.getElementById("mobileError").textContent = "Mobile Number is required";
    isValid = false;
  } else if (!validateMobile(mobileInput.value.trim())) {
    document.getElementById("mobileError").textContent = "Invalid mobile number format";
    isValid = false;
  }

  if (cityInput.value.trim() === "") {
    document.getElementById("cityError").textContent = "City is required";
    isValid = false;
  }

  if (pincodeInput.value.trim() === "") {
    document.getElementById("pincodeError").textContent = "Pincode/Zipcode is required";
    isValid = false;
  } else if (!validatePincode(pincodeInput.value.trim())) {
    document.getElementById("pincodeError").textContent = "Invalid pincode/zipcode format";
    isValid = false;
  }

  if (isValid) {
    const person = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      dob: dobInput.value.trim(),
      email: emailInput.value.trim(),
      mobile: mobileInput.value.trim(),
      city: cityInput.value.trim(),
      pincode: pincodeInput.value.trim()
    };

    addPerson(person);
    clearFormInputs();
  }
});





function sortPersonsData(sortOption) {
  let sortedData = [...personsData];
  
  if (sortOption === 'name') {
    sortedData.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (sortOption === 'age') {
    sortedData.sort((a, b) => {
      const dateA = new Date(a.dob);
      const dateB = new Date(b.dob);
      return dateA.getFullYear() - dateB.getFullYear();
    });
  }
  
  return sortedData;
}



  

  function updatePersonsData(sortedData) {
    personsData = sortedData;
  }
  
  // ...
  
  // Event listener for sort select option
  const sortSelect = document.getElementById('sortSelect');
  sortSelect.addEventListener('change', function (event) {
    const selectedOption = event.target.value;
    const sortedData = sortPersonsData(selectedOption);
    updatePersonsData(sortedData); // Update the personsData array
    renderPersonsTable();
  });

  
  // Event listener for sort select option
  // const sortSelect = document.getElementById('sortSelect');
  // sortSelect.addEventListener('change', function (event) {
  //   const selectedOption = event.target.value;
  //   const sortedData = sortPersonsData(selectedOption);
  //   renderPersonsTable(sortedData);
  // });
  


// Search functionality event listener
const searchInput = document.createElement("input");
searchInput.classList.add("searchinput")




searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "Search by First Name");
searchInput.addEventListener("input", function(event) {
  const searchTerm = event.target.value;
  const filteredData = searchPersonsData(searchTerm);
  cardContainer.innerHTML = "";
  filteredData.forEach((person) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${person.firstName} ${person.lastName}</h3>
      <p><strong>Date of Birth:</strong> ${person.dob}</p>
      <p><strong>Email:</strong> ${person.email}</p>
      <p><strong>Mobile Number:</strong> ${person.mobile}</p>
      <p><strong>City:</strong> ${person.city}</p>
      <p><strong>Pincode/Zipcode:</strong> ${person.pincode}</p>
    `;
    cardContainer.appendChild(card);
  });
});
contentContainer.insertBefore(searchInput, cardContainer);


function switchToShowUsersSection() {
    formContainer.style.display = "none";
    personsTable.style.display = "block";
    cardContainer.style.display = "flex";
    searchInput.style.display = "block"; // Show search input
    sortSelect.style.display = "block"; // Show sort select
  
    renderPersonsData();
  }
  function switchToAddUserSection() {
    formContainer.style.display = "block";
    personsTable.style.display = "none";
    cardContainer.style.display = "none";
    searchInput.style.display = "none"; // Hide search input
    sortSelect.style.display = "none"; // Hide sort select
  }

  showUsersLink.addEventListener("click", function(event) {
    event.preventDefault();
    switchToShowUsersSection();
  });
  
  // Event listener for Add User link
  addUserLink.addEventListener("click", function(event) {
    event.preventDefault();
    switchToAddUserSection();
  });
