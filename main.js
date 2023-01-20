// elementos del html
const pokeCarta = document.getElementById("pokeCarta");
const pokeNombre = document.getElementById("pokeNombre");
const pokeImg = document.getElementById("pokeImg");
const pokeImgContenedor = document.getElementById("imgContenedor");
const pokeId = document.getElementById("pokeId");
const pokeClases = document.getElementById("pokeClases");
const pokeStats = document.getElementById("pokeCaract");
const buscar = document.getElementById("buscar");
const agregar = document.getElementById("contenedorBtn")
const mochila = document.getElementById("mochila")

let pokemonesBuscados = []
let mochilaContenido = []

class Pokemon {
    constructor(id, nombre,) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = 1;
    }
}

// colores
const clasesColores = {
    electric: '#FFEA70',
    normal: '#cfbabd',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#b4b4b4',
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
    
    // quitar el boton capturar al buscar
    agregar.innerHTML = "";
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

    // sumar boton capturar
    const capturar = document.createElement("div");
    capturar.classList.add("contenedor-capturar");
    capturar.innerHTML=`
    <button class="capturar" id="capturar${data.id}" > Capturar </button>
    `
    agregar.appendChild(capturar);

    // crar objeto pokemon
    const poke = new Pokemon(data.id, data.name)
    pokemonesBuscados.push(poke);

    // Capturar pokemones: 
    const btnCapturar = document.getElementById(`capturar${data.id}`);
    btnCapturar.addEventListener("click", () => {
    capturarPokemon(data.id);
    })
}

// funcion para mostrar el color de fondo del pokemon
const colorCarta = types => {
    const colorUno = clasesColores[types[0].type.name];
    const colorDos = types[1] ? clasesColores[types[1].type.name] : clasesColores.default;
    pokeImg.style.background =  `radial-gradient(${colorDos} 33%, ${colorUno} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

// funcion para mostrar las clases
const mostrarClasePokemon = types => {
    pokeClases.innerHTML = '';
    types.forEach(type => {
        const ClaseTextoElemento = document.createElement("div");
        ClaseTextoElemento.style.backgroundColor = clasesColores[type.type.name];
        ClaseTextoElemento.textContent = type.type.name;
        pokeClases.appendChild(ClaseTextoElemento);
    });
}

// funcion para mostrar las caracteristicas
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

// funcion si no se encuentra el pokemon
const pokemonNoEncontrado = () =>{
    pokeNombre.textContent = "No encontrado";
    pokeImg.setAttribute("src", "img/interrogacion.png")
    pokeImg.style.background = "#fff";
    pokeClases.innerHTML = "";
    pokeStats.innerHTML = "";
    pokeId.innerHTML = "";

    Toastify({
        text: "Pokemón no encontrado",
        duration: 3000,
        gravity: "top",
        position: "right",
        close:true,
        style:{
            background: "radial-gradient(grey 33%, black 33%)",
            backgroundSize: "3px 3px",
            color: "white",
            fontFamily: " 'Orbitron', sans-serif",
            borderRadius: "4px",
            border: "1px solid black",
        }
    }).showToast();
}


// funcion para capturar pokeemones
const capturarPokemon = (id) =>{
    const pokemonEnMochila = mochilaContenido.find(poke => poke.id === id);
    if(pokemonEnMochila){
        pokemonEnMochila.cantidad++;
    }else{
    const poke = pokemonesBuscados.find(poke => poke.id === id);
    mochilaContenido.push(poke);
    }

    mostrarMochila();
}

const mostrarMochila = () => {
    mochila.innerHTML = "";

    pokemonEnMochila.forEach(poke => {
        const pokebola = document.createElement("div");
        pokebola.classList.add("pokebola");
        pokebola.innerHTML = `
                <div class="tarjeta">
                    <img src="pokebola.png" class="card-img-top imgProductos" alt="${producto.nombre}">
                    <div class= "card-body">
                        <h5>${producto.nombre}</h5>
                        <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                        <button class="btn colorBoton" id="eliminar${producto.id}" > Eliminar Producto </button>
                    </div>
                </div>
                        `
        contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito: 
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })

    })
    calcularTotal();
}