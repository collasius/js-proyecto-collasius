// AEROLINEAS-CODE 
class Destino {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}
class Clase {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

class Extra {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 1;
    }
}

const colonia = new Destino(1, "Colonia", 15000, "img/colonia.jpg");
const rioDeJaneiro = new Destino(2,"Rio de Janeiro", 35000,"img/rio.jpg");
const miami = new Destino(3,"Miami", 160000, "img/miami.jpg");

const turista = new Clase(11, "Turista", 5000 , "img/turista.jpg");
const ejecutivo = new Clase(12,"Ejecutivo", 30000 ,"img/ejecutivo.jpg");
const primeraClase = new Clase(13,"Primera Clase", 35000,"img/primera.jpg");

const extra1 = new Extra(111, "Desayuno", 2500);
const extra2 = new Extra(112,"Traslado", 3000);

const destinos = [colonia,rioDeJaneiro,miami];
const clases = [turista,ejecutivo,primeraClase];
const extras = [extra1,extra2];

const items = [colonia,rioDeJaneiro,miami,turista,ejecutivo,primeraClase,extra1,extra2]

let pack = [];

// cargar carrito desde el localstorage
if(localStorage.getItem("pack")){
    pack = JSON.parse(localStorage.getItem("pack"));
}

const body = document.getElementById("body");
body.onload = () => {mostrarPack()};

const contenedorDestinos = document.getElementById("contenedorDestinos");
const contenedorClases = document.getElementById("contenedorClases");
const contenedorExtras = document.getElementById("contenedorExtras");

//funcion para mostrar los items:

const mostrarDestinos = () => {
    destinos.forEach(destino => {
        const card = document.createElement("div");
        card.classList.add("col-xl-4");
        card.innerHTML = `
                <div class ="card">
                    <img src="${destino.img}" class="card-img-top imgitems" alt="${destino.img}>"
                    <div class= "card-body">
                        <h5>${destino.nombre}</h5>
                        <p>$${destino.precio.toLocaleString(`es`)}</p>
                        <button class="btn colorBoton" id="boton${destino.id}" > Seleccionar </button>
                    </div>
                </div>
            `                
        contenedorDestinos.appendChild(card);

        // agregar productos al pack:
        const boton = document.getElementById(`boton${destino.id}`);
        boton.addEventListener("click", () => {
            agregarAlPack(destino.id);
            mostrarPack();
        })
    })
}
const mostrarClases = () => {
    clases.forEach(clase => {
        const card = document.createElement("div");
        card.classList.add("col-xl-4");
        card.innerHTML = `
                <div class ="card">
                    <img src="${clase.img}" class="card-img-top imgitems" alt="${clase.img}>"
                    <div class= "card-body">
                        <h5>${clase.nombre}</h5>
                        <p>$${clase.precio.toLocaleString(`es`)}</p>
                        <button class="btn colorBoton" id="boton${clase.id}" > Seleccionar </button>
                    </div>
                </div>
            `                
        contenedorClases.appendChild(card);

        //agregar productos al pack:
        const boton = document.getElementById(`boton${clase.id}`);
        boton.addEventListener("click", () => {
            agregarAlPack(clase.id);
            mostrarPack();
        })
    })
}

const mostrarExtras = () => {
    extras.forEach(extra => {
        const card = document.createElement("div");
        card.classList.add("col-xl-6");
        card.innerHTML = `
                <div class ="card">
                    <div class= "card-body">
                        <h5>${extra.nombre}</h5>
                        <p>$${extra.precio.toLocaleString(`es`)}</p>
                        <button class="btn colorBoton" id="boton${extra.id}" > Seleccionar </button>
                    </div>
                </div>
            `                
        contenedorExtras.appendChild(card);

        //agregar productos al pack:
        const boton = document.getElementById(`boton${extra.id}`);
        boton.addEventListener("click", () => {
            agregarAlPack(extra.id);
            mostrarPack();
        })
    })
}

mostrarDestinos();
mostrarClases();
mostrarExtras();


// funcion agregar al pack:
const agregarAlPack = (id) => {
    const itemEnPack = pack.find(item => item.id === id);
    if(itemEnPack) {
        itemEnPack.cantidad++;
    }else {
        const item = items.find(item => item.id === id);
        pack.push(item);
    }

    // trabajamos con localstorage
    localStorage.setItem("pack", JSON.stringify(pack));
    calcularTotal();
    mostrarPack();
}

//Mostrar el carrito de compras:
const contenedorPack = document.getElementById("contenedorPack");

//Funcion para mostrar el carrito:

const mostrarPack = () => {
    contenedorPack.innerHTML = ""; 
    pack.forEach(items => {
        const item = document.createElement("div");
        item.innerHTML = `
                <div class ="itemPack">
                    <div class= "itemEnPack">
                        <h3>${items.nombre}</h3>
                        <div class="contenedorItem">
                            <p>Valor: $${(items.precio * items.cantidad).toLocaleString(`es`)} </p>
                            <p>Cantidad: ${items.cantidad} </p>
                        </div>
                        <div>
                            <button class="btn colorBoton" id="restar${items.id}" > <i class="fa-solid fa-minus"></i> </button>
                            <button class="btn colorBoton" id="eliminar${items.id}" > <i class="fa-solid fa-xmark"></i> </button>
                        </div>
                    </div>
                </div>
            `                
        contenedorPack.appendChild(item);

        // Eliminar productos del carrito:
        const boton = document.getElementById(`eliminar${items.id}`);
        boton.addEventListener("click", () => {
            eliminarDelPack(items.id);
        })
        const boton2 = document.getElementById(`eliminar${items.id}`);
        boton2.addEventListener("click", () => {
            restarDelPack(items.id);
        })
    })
    calcularTotal();
}

// funcion agregar al pack:
const restarDelPack = (id) => {
    const itemEnPack = pack.find(item => item.id === id);
    if(itemEnPack) {
        itemEnPack.cantidad --;
    }

    // trabajamos con localstorage
    localStorage.setItem("pack", JSON.stringify(pack));
    calcularTotal();
    mostrarPack();
}


//Funcion que elimina el producto del carrito:

const eliminarDelPack = (id) =>{
    const producto = pack.find(items => items.id === id);
    const indice = pack.indexOf(producto);
    pack.splice(indice,1);
    mostrarPack();
    // trabajamos con el local storage
    localStorage.setItem("pack", JSON.stringify(pack));
}

//Vaciar todo el pack.
const vaciarPack = document.getElementById("vaciarPack");

vaciarPack.addEventListener("click", () => {
    eliminarTodoElPack();
})

//Funcion que eliminael carrito:
const eliminarTodoElPack = () => {
    pack = [];
    mostrarPack();
    localStorage.clear();
    
}

//mostramos el mensaje con el total
const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    pack.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `$${totalCompra.toLocaleString(`es`)}`;
}