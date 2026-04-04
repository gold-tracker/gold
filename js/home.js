  
// const rawData = [
//   {
//     "max_price": "1299.380500",
//     "year": "2015"
//   },
//   {
//     "max_price": "1375.229500",
//     "year": "2016"
//   },
//   {
//     "max_price": "1346.781500",
//     "year": "2017"
//   },
//   {
//     "max_price": "1355.948000",
//     "year": "2018"
//   },
//   {
//     "max_price": "1555.182000",
//     "year": "2019"
//   },
//   {
//     "max_price": "2067.200000",
//     "year": "2020"
//   },
//   {
//     "max_price": "1944.518000",
//     "year": "2021"
//   },
//   {
//     "max_price": "2039.100000",
//     "year": "2022"
//   },
//   {
//     "max_price": "2148.990000",
//     "year": "2023"
//   },
//   {
//     "max_price": "2790.170000",
//     "year": "2024"
//   },
//   {
//     "max_price": "4550.799800",
//     "year": "2025"
//   }
// ];


let cache = [];

if(!(localStorage.getItem("cache"))){
 
    fetch('https://api.gold-api.com/history?symbol=XAU&groupBy=year&startTimestamp=1420070400&endTimestamp=1767225600&orderBy=asc', {
    method: 'GET',
    headers: {
    'x-api-key': '4a1777d8a11f125ba759965e6f5446c69ff2a45a44b6cd4c767d202598d428c0'
    }
})
.then(res => res.json())
.then(data => {
    console.log(data)
    console.log("from api")
    cache= data;
    console.log(cache)
    localStorage.setItem("cache", JSON.stringify(data))
});


} else{
    console.log("from cache")
    cache= JSON.parse(localStorage.getItem("cache"))
    console.log(cache)

}




// labels (dates)
// const labels = rawData.map(item => item.year);

// data (convert string → number)
// const prices = rawData.map(item => Number(item.max_price));
// const prices = rawData.map(item => ounceToGram(item.max_price));

const labels = cache.map(item => item.year);

// data (convert string → number)
// const prices = rawData.map(item => Number(item.max_price));
const prices = cache.map(item => ounceToGram(item.max_price));


//   chart

  const ctx = document.getElementById('myChart').getContext('2d');

// your dynamic data
// const myData = [10, 25, 15, 30, 22, 18, 35, 28, 40, 32, 45, 38, 50];

// create gradient
const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
gradient.addColorStop(0, 'rgba(252, 214, 0, 0.9)');
gradient.addColorStop(1, 'rgba(252, 214, 0, 0)');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels, 
    // ['A','B','C','D','E','F','G','H','I','J','K','L','M'],
    datasets: [{
      label: 'Gold rate',
      data:prices , 
    //   myData,
      borderColor: '#fcd600',
      backgroundColor: gradient,
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 3,
      pointBackgroundColor: '#fcd600'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#fcd600' }
      },
      y: {
        ticks: { color: 'white' }
      }
    }
  }
});



let gramPrice=0;

calldata();

function calldata(){

    fetch("https://api.gold-api.com/price/XAU/USD")
    .then(res =>res.json())
    .then(res => {
        let price = res.price;
        localStorage.setItem("price",`${price}`);
        gramPrice = ounceToGram(price);
    
        
        
        document.querySelector(".hero-info .price-display .main-price").textContent=jodCurrency ?`JOD ${usdToJod(price)}/g` : `$ ${price}`
        
        document.querySelector(".hero-info .price-display .decimal").textContent= `.${twoDecimals(price)}`
        
        document.querySelector("#gold24 .asset-price").textContent=jodCurrency ? `JOD ${usdToJod(price24k(gramPrice))}/g` : `$ ${price24k(gramPrice)}/g` ;
        document.querySelector("#gold21 .asset-price").textContent=jodCurrency ? `JOD ${usdToJod(price21k(gramPrice))}/g` : `$ ${price21k(gramPrice)}/g`;
        document.querySelector("#gold18 .asset-price").textContent=jodCurrency ? `JOD ${usdToJod(price18k(gramPrice))}/g` : `$ ${price18k(gramPrice)}/g` ;
        document.querySelector("#goldBar .asset-price").textContent=jodCurrency ? `JOD ${usdToJod(bar1000g(gramPrice))}`: `$ ${bar1000g(gramPrice)}`;
        document.querySelector("#engCoin .asset-price").textContent=jodCurrency ? `JOD ${usdToJod(englishCoin(gramPrice))}` : `$ ${englishCoin(gramPrice)}`;
        document.querySelector("#rashCoin .asset-price").textContent= jodCurrency? `JOD ${usdToJod(rashadiCoin(gramPrice))}` : `$ ${rashadiCoin(gramPrice)}`;
        
        
    });
}
    
    


setInterval(()=>{
        calldata();    
},60000)
    


document.addEventListener("currencyChange", () => {
  refrech();
});


function refrech(){
    // console.log(`athis ${jodCurrency}`)
        // document.querySelector(".hero-info .price-display .main-price").textContent= `$ ${price}`
        // document.querySelector(".hero-info .price-display .decimal").textContent= `.${twoDecimals(price)}`
        document.querySelector(".hero-info .price-display .main-price").textContent=jodCurrency ?`JOD${usdToJod(gramPrice * 28.3495)}` : `$ ${gramPrice * 28.3495}`

        document.querySelector("#gold24 .asset-price").textContent=jodCurrency ? `JOD ${usdToJod(price24k(gramPrice))}/g` : `$ ${price24k(gramPrice)}/g` ;
        document.querySelector("#gold21 .asset-price").textContent=jodCurrency ? `JOD ${usdToJod(price21k(gramPrice))}/g` : `$ ${price21k(gramPrice)}/g`;
        document.querySelector("#gold18 .asset-price").textContent=jodCurrency ? `JOD ${usdToJod(price18k(gramPrice))}/g` : `$ ${price18k(gramPrice)}/g` ;
        document.querySelector("#goldBar .asset-price").textContent=jodCurrency ? `JOD ${usdToJod(bar1000g(gramPrice))}`: `$ ${bar1000g(gramPrice)}`;
        document.querySelector("#engCoin .asset-price").textContent=jodCurrency ? `JOD ${usdToJod(englishCoin(gramPrice))}` : `$ ${englishCoin(gramPrice)}`;
        document.querySelector("#rashCoin .asset-price").textContent= jodCurrency? `JOD ${usdToJod(rashadiCoin(gramPrice))}` : `$ ${rashadiCoin(gramPrice)}`;
        
}


document.querySelector(".view-all").addEventListener("click" , ()=>{
    window.location.href = "assets.html";
})