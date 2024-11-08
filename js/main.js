"use strict";

const input = document.querySelector(".js-input");
const buttonSearch = document.querySelector(".js-btn-search");
const containers = document.querySelector(".js-containers");
const favoritesContainer = document.querySelector(".js-favorities");
const favoritesFromLocalStorage = localStorage.getItem("filmFavorites");
let favorites = [];

if (favoritesFromLocalStorage !== null) {
  favorites = JSON.parse(favoritesFromLocalStorage);
  renderFavorites();
}

function renderFavorites() {
  favoritesContainer.innerHTML = "";
  for (const favorite of favorites) {
    const element = document.createElement("div");
    element.classList.add("list-anime");

    element.innerHTML = `<h5>${favorite.title}</h5><img src="${favorite.image}">`;

    favoritesContainer.appendChild(element);
  }
}

function handleclick() {
  const inputValue = input.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      const animes = data.data;

      containers.innerHTML = "";
      for (const anime of animes) {
        let url = anime.images.jpg.image_url;
        if (
          url ===
          "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
        ) {
          url = "https://via.placeholder.com/210x295/ffffff/666666?text=TV";
        }

        const animeDiv = document.createElement("div");
        animeDiv.classList.add("list-anime");

        for (const favorite of favorites) {

          if (favorite.id === anime.mal_id) {
            animeDiv.classList.add("favorite");
          }
        }

        animeDiv.addEventListener("click", () => {
          favorites.push({
            title: anime.title,
            image: url,
            id: anime.mal_id,
          });
          localStorage.setItem("filmFavorites", JSON.stringify(favorites));
          renderFavorites();
        });

        animeDiv.innerHTML = `<h5>${anime.title}</h5><img src="${url}">`;

        containers.appendChild(animeDiv);
      }
    });
}

buttonSearch.addEventListener("click", handleclick);
