window.addEventListener('DOMContentLoaded', () => {

    // Método para pintar 10 bebidas aleatorias al cargar la página
    const cargaInicial = async () => {
        const contenedor = document.getElementById('contenedor-bebidas');
        contenedor.innerHTML = '';

    for (let i = 0; i < 10; i++) {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
        const result = await fetch(url);
        const data = await result.json();

        printCocktails([data.drinks[0]], false);
    }
};

    const fetchCocktails = async (nombre) => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`;
        const result = await fetch(url);
        const data = await result.json();

        printCocktails(data.drinks);
    };

    const printCocktails = (cocktails, limpiar = true) => {
        const contenedor = document.getElementById('contenedor-bebidas');
        if (limpiar) {contenedor.innerHTML = '';}

        if (!cocktails) {
            contenedor.innerHTML = '<p>No se han encontrado resultados.</p>';
            return;
        }

        cocktails.forEach((cocktail) => {
            const {
                idDrink,
                strDrink,
                strCategory,
                strAlcoholic,
                strGlass,
                strDrinkThumb
            } = cocktail;

            const card = document.createElement('div');
            card.classList.add('tarjeta');

            card.innerHTML = `
                <img src="${strDrinkThumb}" class="tarjeta-img"/>
                <a href="detalle.html?id=${idDrink}" class="tarjeta-titulo clickable">${strDrink}</a>
                <p>Categoría: ${strCategory}</p>
                <p>Vaso: ${strGlass}</p>
                <p>Tipo: ${strAlcoholic}</p>
            `;

            contenedor.appendChild(card);
        });
    };

    // buscador
    const buscador = document.getElementById('buscador');

    buscador.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
            const texto = buscador.value.trim();
            if (texto !== '') {
            fetchCocktails(texto);
        }
    }
    });

    // carga inicial
    cargaInicial();
});