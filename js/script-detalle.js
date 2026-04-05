window.addEventListener('DOMContentLoaded', () => {

  const getCocktail = async (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const result = await fetch(url);
    const data = await result.json();

    createDetail(data.drinks[0]);
  };

  let params = new URLSearchParams(document.location.search);
  let id = params.get("id");

  if (id) {
    getCocktail(id);
  }

  const createDetail = (cocktail) => {
    const contenedor = document.querySelector('#bebida_detail');

    const {
      strDrink,
      strDrinkThumb,
      strCategory,
      strAlcoholic,
      strInstructions
    } = cocktail;

    const card = document.createElement('div');
    card.classList.add('maxi-card');

    card.innerHTML = `
      <img src="${strDrinkThumb}" class="detalle-img"/>
      <h1>${strDrink}</h1>
      <p><strong>Categoría:</strong> ${strCategory}</p>
      <p><strong>Tipo:</strong> ${strAlcoholic}</p>
      <p><strong>Instrucciones:</strong> ${strInstructions}</p>
    `;

    contenedor.innerHTML = '';
    contenedor.appendChild(card);
  };
});