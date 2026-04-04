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
    let goldImage = goldForm.elements["goldImage"].files[0];

    if (!goldWeight || !goldPrice)
      {
       alert("Please fill all fields");
       return;
      }

      if (goldImage) {
  let reader = new FileReader();

  reader.onload = function () {
    let newAsset = {
      id: Date.now(),
      type: goldType,
      karat: goldKarat,
      price: goldPrice,
      weight: goldWeight,
      date: goldDate,
      notes: goldNotes,
      image: reader.result
    };

    saveAsset(newAsset);
  };

  reader.readAsDataURL(goldImage);
} else {
  let newAsset = {
    id: Date.now(),
    type: goldType,
    karat: goldKarat,
    price: goldPrice,
    weight: goldWeight,
    date: goldDate,
    notes: goldNotes,
    image: ""
  };

  saveAsset(newAsset);
}
   
  })


  let assetsContainer = document.getElementById("assetsContainerlist");

    function viewAssets() {
    let user = sessionStorage.getItem("currentUser");
    if (!user) return;

    user = JSON.parse(user);
    let assets = user.assets;

    //to show assets
    renderAssets(assets);
      //to show card
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

let searchAssets = document.getElementById("searchAssets");

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

  if(jodCurrency)
  {
     purchaseCost.textContent = "JOD" + usdToJod(sum);
  }

  else
  {
     purchaseCost.textContent = "$" + sum.toFixed(2);
  }


}

function CurrntValue(assets)
{
  let sum = 0;

  let gramPrice = ounceToGram(Number(localStorage.getItem("price")));

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

  if(jodCurrency)
  {
     currentValue.textContent = "JOD" + usdToJod(sum);
  }

  else
  {
     currentValue.textContent = "$" + sum.toFixed(2);
  }

}

function ProfitLoss(assets)
{
  let purchase = 0;
  let current = 0;

  let gramPrice = ounceToGram(Number(localStorage.getItem("price")));

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

  if (jodCurrency) {
  profitLoss.textContent = "JOD " + usdToJod(result);
  } 
  else {
  profitLoss.textContent = "$" + result.toFixed(2);
  }

  
  if (result >= 0) {
    profitLoss.style.color = "green";
  } else {
    profitLoss.style.color = "red";
  }
}

function renderAssets(assets) {
  assetsContainer.innerHTML = "";

  let gramPrice = ounceToGram(Number(localStorage.getItem("price")));

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

    let current = pricePerGram * Number(a.weight);
    let purchase = Number(a.price) * Number(a.weight);
    let profit = current - purchase;

    assetsContainer.innerHTML += `
      <div class="asset-item">
        <div class="asset-main-info">

          <div class="gold-icon-circle">
            ${a.image ? `<img src="${a.image}" class="asset-img">` : "🪙"}
          </div>

          <div class="details">
            <span class="asset-type">${a.type}</span>
            <span class="asset-karat">${a.karat}</span>
            <span class="asset-weight">${a.weight}g</span>
            <span class="asset-date">• ${a.date}</span>
          </div>
        </div>

        <div class="asset-financial-info">
          <div class="price-group">

            Price per Gram :

            <span class="current-val">
              ${jodCurrency ? "JOD " + usdToJod(current) : "$" + current.toFixed(2)}
            </span>

            Profit/loss ->

            <span class="profit-loss-val" style="color:${profit >= 0 ? "green" : "red"}">
              ${jodCurrency ? "JOD " + usdToJod(profit) : "$" + profit.toFixed(2)}
            </span>

          </div>
          <button class="remove-btn" data-id="${a.id}">❌</button>
        </div>
      </div>
    `;
  });
}

function searchAssetsFunction() {
  searchAssets.addEventListener("input", function () {

    let user = sessionStorage.getItem("currentUser");
    if (!user) return;

    user = JSON.parse(user);

    let assets = [...user.assets];

    let searchValue = this.value.toLowerCase().trim();

    if (searchValue != "") {
      assets.sort((a, b) => {

        let aMatch =
          a.type.toLowerCase().includes(searchValue) ||
          a.karat.toLowerCase().includes(searchValue) ||
          a.date.toLowerCase().includes(searchValue) 
          

        let bMatch =
          b.type.toLowerCase().includes(searchValue) ||
          b.karat.toLowerCase().includes(searchValue) ||
          b.date.toLowerCase().includes(searchValue) 
         

        return bMatch - aMatch;
      });
    }

    renderAssets(assets);
   

  });
}

function saveAsset(newAsset) {
  let user = sessionStorage.getItem("currentUser");

  if (!user) {
    let message = document.getElementById("messageAssets");
    message.textContent = "Please login first";
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
}

viewAssets();
assetsDelete(); 
searchAssetsFunction();

document.addEventListener("currencyChange", () => {
  viewAssets();
});




