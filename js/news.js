async function getNewsData() {
  const res = await fetch(`https://gnews.io/api/v4/search?q=gold market&lang=en&max=5&apikey=8cd4d4c753eceb8ecc2cf74ad9c1cd62`);
  const data = await res.json();
  return data.articles;
}
function NewsSlider(articles) {
  const container = document.getElementById("newsTrack");

  let newsHTML = "";

  articles.forEach(article => {
    newsHTML += `
      <a href="${article.url}" target="_blank">
        🟡 ${article.title}
      </a>
      &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
    `;
  });

  container.innerHTML = newsHTML;
}
function NewsCards(articles) {
  const container = document.getElementById("newsCards");

  let cardsHTML = "";

  articles.forEach(article => {
    cardsHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">

          <img src="${article.image || 'https://via.placeholder.com/300'}" class="card-img-top">

          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${article.title}</h5>

            <p class="card-text">
              ${article.description ? article.description.substring(0, 100) + "..." : "No description"}
            </p>

            <a href="${article.url}" target="_blank" class="btn btn-warning mt-auto">
              Read More
            </a>
          </div>

        </div>
      </div>
    `;
  });

  container.innerHTML = cardsHTML;
}

//function رئيسية تربط كل شيء
async function loadNews() {
  try {
    const articles = await getNewsData();

    NewsSlider(articles); 
    NewsCards(articles);  

    console.log("News loaded");
  } catch (err) {
    console.error(err);
  }
}

loadNews();
setInterval(loadNews, 600000);