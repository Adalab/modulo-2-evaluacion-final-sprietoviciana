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
*/

const input = document.querySelector(".js-input");
const buttonSearch = document.querySelector(".js-btn-search");
const containers = document.querySelector(".js-containers");
let animeList = [];
let animeFavorities = [];

function handleclick() {
  const inputValue = input.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      const animes = data.data;
      containers.innerHTML = "";
      for (const anime of animes) {
        console.log(anime);
        let url = anime.images.jpg.image_url;
        if (
          url ===
          "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
        ) {
          url = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV.";
        } else {
          containers.innerHTML += `<div class="list-anime">
        <h5>${anime.title}</h5>
        <img src="${url}">
        </div>`;
        }
      }
    });
}

buttonSearch.addEventListener("click", handleclick);
