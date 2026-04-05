// Esperar a que todo esté cargado
window.addEventListener('DOMContentLoaded', (event) => {

    // Pedir datos a la API
    const getEquipo = async (id) => {
        const url = `https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id=${id}`;
        const result = await fetch(url);
        const resultJson = await result.json();
        console.log(resultJson);

        createEquipoDetail(resultJson.teams[0]);
    }

    const fetchEquipo = async (id) => {
        await getEquipo(id)
    }

    // Leer parámetro id de la URL
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");
    console.log(id);

    // Llamar a la API
    if (id != null) {
        fetchEquipo(id);
    }

    // Función para pintar el equipo
    const createEquipoDetail = (equipo) => {
        const equipo_detail = document.querySelector('#equipo_detail');
        console.log('contenedor --->', equipo_detail);
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("maxi-card");

        // Destructuración
        const {
            idTeam,
            strTeam,
            strSport,
            strCountry,
            strLeague,
            strStadium,intFormedYear,
            strDescriptionES,
            strBadge
        } = equipo;

        // HTML
        let equipo_innerHTML = `
            <div class="card-body">
                <div class="card-images">
                    <img src="${strBadge}" alt="escudo de ${strTeam}" class="detalle-escudo">
                </div>
                <h1 class="card-body-title">${strTeam}</h1>
                <p class="card-body-text">ID: ${idTeam}</p>
            </div>

            <div class="card-footer">
                <div class="card-footer-social">
                    <h3>${strSport}</h3>
                    <p>Deporte</p>
                </div>
                <div class="card-footer-social">
                    <h3>${strCountry}</h3>
                    <p>País</p>
                </div>
                <div class="card-footer-social">
                    <h3>${strLeague}</h3>
                    <p>Liga</p>
                </div>
                <div class="card-footer-social">
                    <h3>${strStadium}</h3>
                    <p>Estadio</p>
                </div>
                <div class="card-footer-social">
                    <h3>${intFormedYear}</h3>
                    <p>Fundación</p>
                </div>
            </div>

            <div class="detalle-descripcion">
                <p>${strDescriptionES ? strDescriptionES : 'No hay descripción disponible en español.'}</p>
            </div>
        `;

        // Insertar en la página
        tarjeta.innerHTML = equipo_innerHTML;
        // Limpiar el contenedor
        equipo_detail.innerHTML = '';
        // Meter la tarjeta en la página
        equipo_detail.appendChild(tarjeta);
    }
});