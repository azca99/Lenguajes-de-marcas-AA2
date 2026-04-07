window.addEventListener('DOMContentLoaded', () => {

  const getCocktail = async (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const result = await fetch(url);
    const data = await result.json();

    const cocktail = data.drinks[0];
    
    createDetail(cocktail);

    if (cocktail.strIngredient1) {
      getCocktailByIngredient(cocktail.strIngredient1, cocktail.idDrink);
    }
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
    <div id="cocktails-relacionados"></div>
    `;

    contenedor.innerHTML = '';
    contenedor.appendChild(card);
  };

  const getCocktailByIngredient = async (ingredient, currentId) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const result = await fetch(url);
    const data = await result.json();

    printRelatedCocktails(data.drinks, currentId, ingredient);
  };

  const printRelatedCocktails = (cocktails, currentId, ingredient) => {
    const contenedor = document.querySelector('#cocktails-relacionados');

    if (!cocktails || !contenedor) {
      return;
    }

    const relacionados = cocktails.filter(cocktail => cocktail.idDrink !== currentId).slice(0, 4);

    if (relacionados.length === 0) {
      return;
    }

    let html = `<h2>Cócteles relacionados por el ingrediente "${ingredient}":</h2><div class="relacionados-container">`;

    relacionados.forEach(cocktail => {
      html += `
        <a href="detalle.html?id=${cocktail.idDrink}" class="relacionado-card">
          <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" class="relacionado-img"/>
          <p class="relacionado-nombre">${cocktail.strDrink}</p>
        </a>
      `;
    });

      html += `</div>`;

    contenedor.innerHTML = html;
  }
});