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
const contadorText = document.getElementById("contadorText")
const baya = document.getElementById("baya")

let pokemonesBuscados = []
let mochilaContenido = []

// cargar mochila desde el localstorage
if(localStorage.getItem("mochilaContenido")){
    mochilaContenido = JSON.parse(localStorage.getItem("mochilaContenido"));
}

const body = document.getElementById("body");
body.onload = () => {
    cambiarFondo()
    mostrarMochila()
};


// funcion cambiar fondo en base la hora
function cambiarFondo() {
    const hora = new Date();
    const tiempo = hora.getHours();

    if(tiempo >= 0 && tiempo < 6) {
        body.classList.add("fondo-noche");

    }else if (tiempo >= 6 && tiempo < 9) {
        body.classList.add("fondo-amanecer");
        
    }else if (tiempo >= 9 && tiempo < 18) {
        body.classList.add("fondo-dia");

    } else if (tiempo >= 18 && tiempo < 20) {
        body.classList.add("fondo-tarde");

    } else if (tiempo >= 20 && tiempo <= 24) {
        body.classList.add("fondo-noche");

    }else {
        body.classList.add("fondo-dia");
    }

}


class Pokemon {
    constructor(id, nombre, img) {
        this.id = id;
        this.nombre = nombre;
        this.img = img;
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
    // baya
    baya.innerHTML =`
        <button class="btn-baya" id="btnBaya">
            <img src="img/baya.png" alt="" class="img-baya">
        </button>
    `
    const btnBaya = document.getElementById("btnBaya")
    btnBaya.addEventListener("click", () => {
        suministrar()
    })
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
    baya.innerHTML ="";

    Toastify({
        text: "Pokemón no encontrado",
        duration: 2000,
        gravity: "top",
        position: "right",
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
    const random = Math.round(Math.random())

    if(pokemonEnMochila){
        pokemonEnMochila.cantidad++;
        Toastify({
            text: "Pokemón en mochila",
            duration: 2000,
            gravity: "top",
            position: "right",
            style:{
                background: "radial-gradient(grey 33%, white 33%)",
                backgroundSize: "3px 3px",
                color: "black",
                fontFamily: " 'Orbitron', sans-serif",
                borderRadius: "4px",
                border: "1px solid black",
            }
        }).showToast();
    } else if (random === 1){
        Toastify({
            text: "Ops! intenta darle una baya",
            duration: 2000,
            gravity: "top",
            position: "right",
            style:{
                background: "radial-gradient(black 33%, yellow 33%)",
                backgroundSize: "3px 3px",
                color: "black",
                fontFamily: " 'Orbitron', sans-serif",
                borderRadius: "4px",
                border: "1px solid black",
            }
        }).showToast();
    }else if (random === 0){
    const poke = pokemonesBuscados.find(poke => poke.id === id);
    mochilaContenido.push(poke);

    Toastify({
        text: "Pokemón capturado",
        duration: 2000,
        gravity: "top",
        position: "right",
        style:{
            background: "radial-gradient(black 33%, red 33%)",
            backgroundSize: "3px 3px",
            color: "black",
            fontFamily: " 'Orbitron', sans-serif",
            borderRadius: "4px",
            border: "1px solid black",
        }
    }).showToast();
    }

    // trabajamos con localstorage
    localStorage.setItem("mochilaContenido", JSON.stringify(mochilaContenido));

    mostrarMochila();
}

// funcion para mostrar mochila
const mostrarMochila = () => {
    mochila.innerHTML = "";

    mochilaContenido.forEach(pokemon => {
        const pokebola = document.createElement("div");
        pokebola.classList.add("pokebolas");
        pokebola.innerHTML = `
                <div class="pokebola">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" class="img-poke-cap">

                    <div class="pokebola-fondo"></div>
                    <div class="pokeball">
                    <div class="pokeball-superior">
                    </div>
                    <div class="pokeball-frontal"></div>
                    <div class="pokeball-inferior">
                    </div>
                </div>
                </div>
                <button class="btn-liberar" id="liberar${pokemon.id}" >Liberar a ${pokemon.nombre}</button>
                        `
        mochila.appendChild(pokebola);

        const liberar = document.getElementById(`liberar${pokemon.id}`);
        liberar.addEventListener("click", () => {
            liberarPokemon(pokemon.id);
        })
    })

        // contador de pokemones
    const contadorPoke = mochilaContenido.length;

    contadorText.innerText = `- ${contadorPoke}`;
    if (contadorPoke == 0) {
        contadorText.innerText = " - 0";
    }
}

// funcion para liberar pokemon
const liberarPokemon = (id) => {
    const pokemon = mochilaContenido.find(pokemon => pokemon.id === id);
    const indice = mochilaContenido.indexOf(pokemon);
    mochilaContenido.splice(indice, 1);
    mostrarMochila();

    Toastify({
        text: "Pokemón liberado",
        duration: 2000,
        gravity: "top",
        position: "right",
        style:{
            background: "radial-gradient(black 33%, white 33%)",
            backgroundSize: "3px 3px",
            color: "red",
            fontFamily: " 'Orbitron', sans-serif",
            borderRadius: "4px",
            border: "1px solid black",
        }
    }).showToast();
    // trabajamos con el local storage
    localStorage.setItem("mochilaContenido", JSON.stringify(mochilaContenido));
}

// suministrar baya: 

const suministrar = () => {
    Toastify({
        text: "Baya suministrada",
        duration: 1000,
        gravity: "top",
        position: "center",
        style:{
            background: "radial-gradient(white 33%, red 33%)",
            backgroundSize: "3px 3px",
            color: "white",
            fontFamily: " 'Orbitron', sans-serif",
            borderRadius: "4px",
            border: "1px solid black",
        }
    }).showToast();
}
