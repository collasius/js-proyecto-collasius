// elementos del html
const pokeCarta = document.getElementById("pokeCarta");
const pokeNombre = document.getElementById("pokeNombre");
const pokeImg = document.getElementById("pokeImg");
const pokeImgContenedor = document.getElementById("imgContenedor");
const pokeId = document.getElementById("pokeId");
const pokeClases = document.getElementById("pokeClases");
const pokeStats = document.getElementById("pokeCaract");

const buscar = document.getElementById("buscar");

// colores
const clasesColores = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

//evento para buscar pokemon
buscar.addEventListener("submit", (e) => {
    e.preventDefault();
    buscarPokemon();
})

// funcion para buscar pokemon
const buscarPokemon = () => {
    const {value} = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => mostrarInfoPokemon(response))
        .catch(err => pokemonNoEncontrado())
}

// funcion para mostrar pokemon
const mostrarInfoPokemon = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;
    pokeNombre.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    colorCarta(types);
    mostrarClasePokemon(types);
    mostrarCaractPokemon(stats);
}

// funcion para mostrar el color de fondo del pokemon
const colorCarta = types => {
    const colorUno = clasesColores[types[0].type.name];
    const colorDos = types[1] ? clasesColores[types[1].type.name] : clasesColores.default;
    pokeImg.style.background =  `radial-gradient(${colorDos} 33%, ${colorUno} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const mostrarClasePokemon = types => {
    pokeClases.innerHTML = '';
    types.forEach(type => {
        const ClaseTextoElemento = document.createElement("div");
        ClaseTextoElemento.style.color = clasesColores[type.type.name];
        ClaseTextoElemento.textContent = type.type.name;
        pokeClases.appendChild(ClaseTextoElemento);
    });
}

const mostrarCaractPokemon = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const caractElemento = document.createElement("div");
        const caractNombreElemento = document.createElement("div");
        const caractValorElemento = document.createElement("div");
        caractNombreElemento.textContent = stat.stat.name;
        caractValorElemento.textContent = stat.base_stat;
        caractElemento.appendChild(caractNombreElemento);
        caractElemento.appendChild(caractValorElemento);
        pokeStats.appendChild(caractElemento);
    });
}

const pokemonNoEncontrado = () =>{
    pokeNombre.textContent = "No encontrado";
    pokeImg.setAttribute("src", "img/interrogacion.png")
    pokeImg.style.background = "#fff";
    pokeClases.innerHTML = "";
    pokeStats.innerHTML = "";
    pokeId.innerHTML = "";
}