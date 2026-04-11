const loginBtnCon = document.getElementById("loginBtnCon");
const lotoutBtnCon = document.getElementById("lotoutBtnCon");
const assetsLink = document.querySelectorAll(".nav-links a")[1];
const loginBtn = document.getElementById("loginBtn");
const signUpBtn = document.getElementById("signUpBtn");
const logoutBtn = document.getElementById("logoutBtn");
const usdBtn = document.getElementById("usdBtn")
const jodBtn = document.getElementById("jodBtn")

let jodCurrency = false; 

let user = JSON.parse(sessionStorage.getItem("currentUser"));

if (!user) {
    lotoutBtnCon.style.display="none";
    loginBtnCon.style.display="flex";
    assetsLink.style.display="none";
} else {
    lotoutBtnCon.style.display="flex";
    loginBtnCon.style.display="none";
    assetsLink.style.display="inline";
}


// login log out buttons
loginBtn.addEventListener("click" , (e)=>{
    e.preventDefault();
    window.location.href = "login.html";
})

signUpBtn.addEventListener("click" , (e)=>{
    e.preventDefault();
    window.location.href = "register.html";
})

logoutBtn.addEventListener("click" , (e)=>{
    e.preventDefault();
    logout();
    window.location.reload();
})


// to convert cournecy
usdBtn.addEventListener("click",()=>{
    usdBtn.classList.add("active");
    jodBtn.classList.remove("active");
    jodCurrency = false;
    document.dispatchEvent(new Event("currencyChange"));
})

jodBtn.addEventListener("click",()=>{
    usdBtn.classList.remove("active");
    jodBtn.classList.add("active");
    jodCurrency = true;
    document.dispatchEvent(new Event("currencyChange"));
})



// nav links active 
if(window.location.pathname.split("/").pop()=="index.html"){
    document.querySelectorAll(".nav-links a")[0].classList.add("active");
    document.querySelectorAll(".nav-links a")[1].classList.remove("active");

}else{
    document.querySelectorAll(".nav-links a")[1].classList.add("active");
    document.querySelectorAll(".nav-links a")[0].classList.remove("active");
}





