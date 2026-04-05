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

  const createDetail = (cocktail) => {
    const contenedor = document.querySelector('#bebida_detalle');

    const {
      strDrink,
      strDrinkThumb,
      strCategory,
      strAlcoholic,
      strGlass,
      strInstructions,
      strIngredient1,
      strIngredient2,
      strIngredient3,
    } = cocktail;

    const card = document.createElement('div');
    card.classList.add('maxi-card');

    card.innerHTML = `
      <img src="${strDrinkThumb}" class="detalle-img"/>
      <h1>${strDrink}</h1>
      <p>Categoría: ${strCategory}</p>
      <p>Tipo: ${strAlcoholic}</p>
      <p>Vaso: ${strGlass}</p>
      <p>Ingredientes: ${strIngredient1}, ${strIngredient2}, ${strIngredient3}</p>
      <p>Instrucciones: ${strInstructions}</p>
    `;

    contenedor.innerHTML = '';
    contenedor.appendChild(card);
  };
});