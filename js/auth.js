// auth page
// Regex
let registerForm=document.getElementById("registerForm");
let loginForm=document.getElementById("loginForm");
let nameRegex=/^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^07[789]\d{7}$/;
let passwordRegex = /^(?=.*\d.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,32}$/;

// ================= REGISTER =================
if(registerForm){
registerForm.addEventListener ("submit",(e)=>{
  e.preventDefault();

  let name = document.getElementById("name");
  let phone = document.getElementById("phone");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirmPassword");
  
  let nameError = document.getElementById("nameError");
  let phoneError  = document.getElementById("phoneError");
  let emailError = document.getElementById("emailError");
  let passwordError  = document.getElementById("passwordError");
  let confirmPasswordError  = document.getElementById("confirmPasswordError");
nameError.textContent = "";
phoneError.textContent = "";
emailError.textContent = "";
passwordError.textContent = "";
confirmPasswordError.textContent = "";

  let isValid = true;

  // Name
  if (name.value.trim() === "") {
   nameError.textContent = "Name required";
    isValid = false;
  } else if(!nameRegex.test(name.value)){
       nameError .textContent = "Name must contains letters only";
           isValid = false;
  }
  // Phone
  if(phone.value===""){
       phoneError .textContent = "phoneNumber required";
           isValid = false;
  }else if (!phoneRegex.test(phone.value)) {
    phoneError.textContent = "Invalid phoneNumber";
    isValid = false;
  }
  // Email
if(email.value===""){
           emailError .textContent = "email required";
           isValid = false;
} else if (!emailRegex.test(email.value)) {
    emailError.textContent = "Invalid email";
    isValid = false;
  }
  // Password
  if(password.value===""){
           passwordError .textContent = "password required";
            isValid = false;

  }else if (!passwordRegex.test(password.value)) {
       passwordError.textContent= "Password must start with capital, include 2 numbers, 1 special char, 8-32 length";
    isValid = false;
    }
  // Confirm
  if (confirmPassword.value !== password.value || confirmPassword.value === "") {
    confirmPasswordError.textContent = "Passwords do not match";
    isValid = false;
    }

  if (!isValid) return ;

  // Save user from browser and if no user returns empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];
//find:  will check to every element in array instead of for loop that if user email in array(old) = email in input field(new)  
  if (users.find(u => u.email === email.value)) {
    alert("Email already exists");
    return;
  }

  let newUser = {
    id: Date.now(),
    name: name.value,
    phone: phone.value,
    email: email.value,
    password: password.value,
    assets:[]
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered successfully");
window.location.href = "login.html";
});
}

// ================= LOGIN =================
if(loginForm){
 loginForm.addEventListener("submit",(e)=> {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  sessionStorage.setItem("currentUser", JSON.stringify(user));

  window.location.href = "index.html";
});
}

// ================= LOGOUT =================
function logout() {
  sessionStorage.removeItem("currentUser");
  window.location.replace = "login.html";
}