// Petición a la API para obtener el json de datos
const fetchEquipos = async (nombreEquipo) => {
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${nombreEquipo}`;
    const result = await fetch(url);
    const data = await result.json();
    console.log('datos de la api --->', data);

    printEquipos(data.teams);
}

// Llevar los datos de la api al HTML usando el DOM
const printEquipos = (equipos) => {
  console.log('equipos en printEquipos() --->', equipos);

  const listaEquipos = document.getElementById('contenedor-partidos');
  console.log('lista de equipos --->', listaEquipos);

  // Limpiar el contenedor por si hubiera contenido previo
  listaEquipos.innerHTML = '';

  // Comprobar que existen equipos con ese nombre
  if (!equipos) {
    listaEquipos.innerHTML = '<p>No se han encontrado equipos.</p>';
    return;
  }

  // Varios equipos (diferente deporte) con el mismo nombre
  equipos.forEach((equipo) => {
    console.log('equipo --->', equipo);

    const {
      idTeam,
      strTeam,
      strSport,
      strCountry,
      strBadge
    } = equipo;

    const card = document.createElement('div');
    card.classList.add('tarjeta');

    card.innerHTML = `
      <img
        src="${strBadge}"
        alt="escudo de ${strTeam}"
        class="tarjeta-img"
      />
      <h3 class="tarjeta-titulo">${strTeam}</h3>
      <p class="tarjeta-texto">ID: ${idTeam}</p>
      <p class="tarjeta-texto">Deporte: ${strSport}</p>
      <p class="tarjeta-texto">País: ${strCountry}</p>
    `;

    listaEquipos.appendChild(card);
  });
}

// Guardar el texto introducido
const buscador = document.getElementById('buscador');
console.log('buscador --->', buscador);

// Evento al pulsar Enter
buscador.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const textoBusqueda = buscador.value.trim();
    console.log('texto buscado --->', textoBusqueda);

    if (textoBusqueda !== '') {
      fetchEquipos(textoBusqueda);
    }
  }
});

// Carga inicial
const cargaInicial = async () => {
    const equiposIniciales = ['Real Zaragoza', 'Barcelona', 'Arsenal', 'Milan'];

    let todosEquipos = [];

    for (let nombre of equiposIniciales) {
        const url = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${nombre}`;

        const result = await fetch(url);
        const data = await result.json();

        if (data.teams) {
            todosEquipos = todosEquipos.concat(data.teams);
        }
    }

    console.log('equipos iniciales --->', todosEquipos);

    printEquipos(todosEquipos);
}

cargaInicial();