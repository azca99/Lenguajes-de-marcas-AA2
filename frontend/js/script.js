window.addEventListener('DOMContentLoaded', () => {

    // Método para pintar 12 bebidas aleatorias al cargar la página
    const cargaInicial = async () => {
        const contenedor = document.getElementById('contenedor-bebidas');
        contenedor.innerHTML = '';

        for (let i = 0; i < 12; i++) {
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
                <p class ="tarjeta-texto">Categoría: ${strCategory}</p>
                <p class="tarjeta-texto">Vaso: ${strGlass}</p>
                <p class="tarjeta-texto">Tipo: ${strAlcoholic}</p>
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

    // Agregar eventos a los botones de editar y eliminar
    const addEventosFavoritos = () => {
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        const botonesEditar = document.querySelectorAll('.btn-editar');

        botonesEliminar.forEach((boton) => {
            boton.addEventListener('click', async () => {
                const id = boton.dataset.id;

                try {
                    await fetch(`http://localhost:3001/favoritos/${id}`, {
                        method: 'DELETE'
                    });

                    fetchFavoritos();
                } catch (error) {
                    console.log('Error al eliminar favorito:', error);
                }
            });
        });

        botonesEditar.forEach((boton) => {
            boton.addEventListener('click', async () => {
                const id = boton.dataset.id;
                const input = document.getElementById(`comentario-${id}`);
                const comentario = input.value.trim();

                try {
                    await fetch(`http://localhost:3001/favoritos/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ comentario })
                    });

                    fetchFavoritos();
                } catch (error) {
                    console.log('Error al actualizar favorito:', error);
                }
            });
        });
    };

    // Método para pintar los favoritos
    const printFavoritos = (favoritos) => {
        // Ir al contenedor de favoritos
        const contenedor = document.getElementById('contenedor-favoritos');

        if (!contenedor) return;

        contenedor.innerHTML = '';

        // Comprobar si hay favoritos
        if (!favoritos || favoritos.length === 0) {
            contenedor.innerHTML = '<p>No hay favoritos guardados.</p>';
            return;
        }

        // Pintar cada favorito
        favoritos.forEach((favorito) => {
            const card = document.createElement('div');
            card.classList.add('tarjeta');

            card.innerHTML = `
                <img src="${favorito.imagen}" class="tarjeta-img"/>
                <h3 class="tarjeta-titulo">${favorito.nombre}</h3>
                <p class="tarjeta-texto">Tipo: ${favorito.alcoholico}</p>
                <p class="tarjeta-texto">Comentario: ${favorito.comentario ? favorito.comentario : 'Sin comentario'}</p>
                <input type="text" id="comentario-${favorito.id}" placeholder="Editar comentario">
                <button class="btn-editar" data-id="${favorito.id}">Editar</button>
                <button class="btn-eliminar" data-id="${favorito.id}">Eliminar</button>
            `;

            contenedor.appendChild(card);
        });

        // Agregar eventos a los botones de editar y eliminar
        addEventosFavoritos();
    };

    // Obtener los favoritos
    const fetchFavoritos = async () => {
        try {
            const response = await fetch('http://localhost:3001/favoritos');
            const favoritos = await response.json();
            printFavoritos(favoritos);
        } catch (error) {
            console.log('Error al obtener favoritos:', error);
        }
    };

    // carga inicial
    cargaInicial();
    // cargar favoritos
    fetchFavoritos();
});