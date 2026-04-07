window.addEventListener('DOMContentLoaded', () => {

  const getCocktail = async (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const result = await fetch(url);
    const data = await result.json();

    createDetail(data.drinks[0]);
  };

  let params = new URLSearchParams(document.location.search);
  let id = params.get("id");

  if (id != undefined) {
    getCocktail(id);
  }

  const getIngredients = (cocktail) => {
    let ingredientesHTML = '';

    // Hasta 15 ingredientes
    for (let i = 1; i <= 15; i++) {
      let ingrediente = cocktail[`strIngredient${i}`];
      let medida = cocktail[`strMeasure${i}`];

      if (ingrediente && ingrediente.trim() !== '') {
        ingredientesHTML += `<li>${medida ? medida : ''} ${ingrediente}</li>`;
      }
    }
    return ingredientesHTML;
  };

  const createDetail = (cocktail) => {
    const ingredientesHTML = getIngredients(cocktail);
    const contenedor = document.querySelector('#bebida_detalle');

    const {
      strDrink,
      strDrinkThumb,
      strCategory,
      strAlcoholic,
      strGlass,
      strInstructions,
      strIBA,
      strTags,
    } = cocktail;

    const card = document.createElement('div');
    card.classList.add('maxi-card');

    card.innerHTML = `
      <img src="${strDrinkThumb}" class="detalle-img"/>
      <h1 class="maxi-card-titulo">${strDrink}</h1>
      <p class="maxi-card-texto">Categoría: ${strCategory}</p>
      <p class="maxi-card-texto">Tipo: ${strAlcoholic}</p>
      <p class="maxi-card-texto">Vaso: ${strGlass}</p>
      <p class="maxi-card-texto">Ingredientes:</p>
      <ul class="maxi-card-ingredientes">${ingredientesHTML}</ul>
      <p class="maxi-card-texto">Instrucciones: ${strInstructions}</p>
      <p class="maxi-card-texto">IBA: ${strIBA ? strIBA : 'No'}</p>
      <p class="maxi-card-texto">Tags: ${strTags ? strTags : '.'}</p>
    `;

    contenedor.innerHTML = '';
    contenedor.appendChild(card);
  };
});