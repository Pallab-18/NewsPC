const API_KEY= "65209bcb67e74e7fbe990bef69f9abc4";
const url="https://newsapi.org/v2/everything?q=";


window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});




// Function to toggle between dark and light mode
function toggleMode() {
    const body = document.body;
    const toggleBtn = document.getElementById('toggle-mode-btn');
  
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      toggleBtn.textContent = 'Dark Mode';
      localStorage.setItem('mode', 'light');
    } else {
      body.classList.add('dark-mode');
      toggleBtn.textContent = 'Light Mode';
      localStorage.setItem('mode', 'dark');
    }
  }
  
  // Function to set the initial mode based on user preference or default to light mode
  function setInitialMode() {
    const body = document.body;
    const toggleBtn = document.getElementById('toggle-mode-btn');
    const savedMode = localStorage.getItem('mode');
  
    if (savedMode === 'dark') {
      body.classList.add('dark-mode');
      toggleBtn.textContent = 'Light Mode';
    } else {
      body.classList.remove('dark-mode');
      toggleBtn.textContent = 'Dark Mode';
    }
  }
  
  // Call the setInitialMode function when the page loads
  window.onload = setInitialMode;
  



