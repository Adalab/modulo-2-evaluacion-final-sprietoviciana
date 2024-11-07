"use strict";

/* Pasos:

-Crear clases. HECHO
-Seleccionar los elementos que necesito: input, boton y divs. HECHO
- Cuando haga click en el boton de buscar:
   - recojo el valor del input. HECHO
   - se hace una llamada al servidor con los datos del api. HECHO
   - si coincide con alguna descripcion de alguna serie, que se pinte en pantalla. HECHO
   - para que salgan las series que contengan el valor del input, tengo que concatenar el input en la url del api. HECHO
   - tiene que mostrarse la imagen y la descripcion de la serie. HECHO
   - si la serie no tiene img, meter nuestra propia imagen de relleno. HECHO
     Hay que hacerlo de esta forma: https://via.placeholder.com/210x295/ffffff/666666/?text=TV

LISTADO DE FAVORITOS
- Cuando un usuario le de click encima de una pelicula, se añadirá a favoritos.
- se irá incluyendo en la lista vacia.
- tambien se cambiará el color de fondo en ambas partes y el titulo tambien cambiará de color, para que destaque.
- no se deben quitar las peliculas de la lista de favoritos cuando se haga otra busqueda.
- guardar la lista de favoritos en LS.
*/

const input = document.querySelector(".js-input");
const buttonSearch = document.querySelector(".js-btn-search");
const containers = document.querySelector(".js-containers");
const favoritesContainer = document.querySelector(".js-favorities");
let favorites = [];

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

        const element = document.createElement("div");
        element.classList.add("list-anime");

        element.addEventListener("click", () => {
          favorites.push({
            title: anime.title,
            image: url,
          });
          renderFavorites();
        });

        element.innerHTML = `<h5>${anime.title}</h5><img src="${url}">`;

        containers.appendChild(element);
      }
    });
}

buttonSearch.addEventListener("click", handleclick);
