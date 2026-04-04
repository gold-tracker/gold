
async function loadNews() {
  const container = document.getElementById("newsTrack");

  try {
    const res = await fetch(`https://gnews.io/api/v4/search?q=Google&lang=en&max=5&apikey=8cd4d4c753eceb8ecc2cf74ad9c1cd62`);
    const data = await res.json();

    let newsHTML = "";

    data.articles.forEach(article => {
      newsHTML += `
        <a href="${article.url}" target="_blank">
          🟡 ${article.title}
        </a>
        &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
      `;
    });

    container.innerHTML = newsHTML;

  } catch (err) {
    container.innerHTML = "Failed to load news";
  }
}

loadNews();
setInterval(loadNews, 600000);