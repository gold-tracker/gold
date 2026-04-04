// assets
//  let newUser = {
//     id: Date.now(),
//     name: name.value,
//     phone: phone.value,
//     email: email.value,
//     password: password.value,
//     assets:[]
//   };

   

  let goldForm =document.getElementById("goldForm");

  goldForm.addEventListener("submit",function(e){
    e.preventDefault();

    let goldType = goldForm.elements["goldType"].value
    let goldKarat = goldForm.elements["goldKarat"].value
    let goldPrice = goldForm.elements["priceGram"].value
    let goldWeight = goldForm.elements["goldWeight"].value
    let goldDate = goldForm.elements["goldDate"].value
    let goldNotes = goldForm.elements["goldNotes"].value


    if (!goldWeight || !goldPrice)
      {
       alert("Please fill all fields");
       return;
      }


    let newAsset ={
    id: Date.now(),
    type: goldType,
    karat: goldKarat,
    price: goldPrice,
    weight: goldWeight,
    date: goldDate,
    notes: goldNotes,
   }

   let user = sessionStorage.getItem("currentUser");

   if (!user) {
    let message =document.getElementById("messageAssets");
    message.textContent="Please login first"
    return;
    }

    user = JSON.parse(user);

    user.assets.push(newAsset);

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex != -1) {
     users[userIndex] = user;
    localStorage.setItem("users", JSON.stringify(users));
    }

    sessionStorage.setItem("currentUser", JSON.stringify(user));

    viewAssets();
    goldForm.reset();


  })


  let assetsContainer = document.getElementById("assetsContainerlist");

    function viewAssets()
    {

        let user = sessionStorage.getItem("currentUser");

         if (!user)
          {return} ;

        user = JSON.parse(user);
        let assets=user.assets
        
      assetsContainer.innerHTML = "";

      assets.forEach(a => {
      assetsContainer.innerHTML += 
      `
  <div class="asset-item">
    <div class="asset-main-info">
      <div class="gold-icon-circle">🏛️</div>
      <div class="details">
        <span class="asset-type-karat">${a.type} - ${a.karat}</span>
        <span class="asset-weight-date">${a.weight}g • ${a.date}</span>
      </div>
    </div>
    <div class="asset-financial-info">
      <div class="price-group">
        <span class="current-val">$${a.price}</span>
        <span class="profit-loss-val">Pending calculation</span>
      </div>
  <button class="remove-btn" data-id="${a.id}">🗑️</button>    </div>
  </div> 
   `;
         
      });

      Weight(assets);
      Cost(assets);
      CurrntValue(assets);
      ProfitLoss(assets);

    }


    function assetsDelete() {
  assetsContainer.addEventListener("click", function(e) {

    if (e.target.classList.contains("remove-btn")) {

      let id = Number(e.target.dataset.id);

      let user = JSON.parse(sessionStorage.getItem("currentUser"));

      user.assets = user.assets.filter(a => a.id !== id);

      let users = JSON.parse(localStorage.getItem("users")) || [];
      let index = users.findIndex(u => u.id === user.id);

      if (index !== -1) {
        users[index] = user;
        localStorage.setItem("users", JSON.stringify(users));
      }

      sessionStorage.setItem("currentUser", JSON.stringify(user));

      viewAssets();
    }

    

  });
}

let totalWeight= document.getElementById("totalWeight");
 let purchaseCost=document.getElementById("PurchaseCost"); 
 let currentValue=document.getElementById("CurrentValue");
 let profitLoss=document.getElementById("ProfitLoss"); 

function Weight(assets)
{
  let sum = 0;

  assets.forEach(a=>{
  sum += Number(a.weight);
  })

   totalWeight.textContent = sum + " g";

}

//purchaseCost
function Cost(assets){
   let sum = 0;

  assets.forEach(a => {
    sum += Number(a.price) * Number(a.weight);
  });

  purchaseCost.textContent = "$" + sum.toFixed(2);



}

function CurrntValue(assets)
{
  let sum = 0;

  let gramPrice = Number(localStorage.getItem("goldPrice"));

  assets.forEach(a => {

    let pricePerGram = 0;

    if (a.karat.includes("24")) {
      pricePerGram = Number(price24k(gramPrice));
    } 
    else if (a.karat.includes("21")) {
      pricePerGram = Number(price21k(gramPrice));
    } 
    else if (a.karat.includes("18")) {
      pricePerGram = Number(price18k(gramPrice));
    }

    sum += pricePerGram * Number(a.weight);
  });

  currentValue.textContent = "$" + sum.toFixed(2);

}

function ProfitLoss(assets)
{
  let purchase = 0;
  let current = 0;

  let gramPrice = Number(localStorage.getItem("goldPrice"));

  assets.forEach(a => {

    let weight = Number(a.weight);
    let price = Number(a.price);

    
    purchase += price * weight;

    
    let pricePerGram = 0;

    if (a.karat.includes("24")) {
      pricePerGram = Number(price24k(gramPrice));
    } 
    else if (a.karat.includes("21")) {
      pricePerGram = Number(price21k(gramPrice));
    } 
    else if (a.karat.includes("18")) {
      pricePerGram = Number(price18k(gramPrice));
    }

    current += pricePerGram * weight;
  });

  let result = current - purchase;

  profitLoss.textContent = "$" + result.toFixed(2);

  
  if (result >= 0) {
    profitLoss.style.color = "green";
  } else {
    profitLoss.style.color = "red";
  }
}


assetsDelete(); 
viewAssets();


