class Linea {
    constructor(numeroLinea, nombre, fecha) {
        this.numeroLinea = numeroLinea;
        this.nombre = nombre;
        this.fecha = fecha;
    }
}

const linea1 = new Linea(1122334455,"Pablo", new Date(2021,0,2,15,45));
const linea2 = new Linea(1123456789,"Meli", new Date(2021,5,6,13,22));


const arrayLineas = [];

arrayLineas.push(linea1);
arrayLineas.push(linea2);

function altaLinea() {
    let numeroLinea = parseInt(prompt("Ingrese su numero de linea: "));
    let nombre = prompt("Ingrese su nombre de usuario: ");
    let fecha = new Date();
    let lineaPrincipal = new Linea(numeroLinea, nombre, fecha);
    arrayLineas.unshift(lineaPrincipal);
    alert(`Bienvenid@ ${lineaPrincipal.nombre} a Movijaus`)
}

const lineaPrincipal = altaLinea();

function menu() {
    let opcion = parseInt(prompt("Ingrese una opción: \n 1) Alta de Linea \n 2) Baja de Linea \n 3) Modificación de usuario \n 4) Consulta de antiguedad \n 5) Salir"));
    return opcion;
}

function altaLineaNueva() {
    let numeroLinea = parseInt(prompt("Ingrese el numero de linea: "));
    let nombre = prompt("Ingrese el nombre de usuario: ");
    let fecha = new Date();
    let lineaNueva = new Linea(numeroLinea, nombre, fecha);
    arrayLineas.unshift(lineaNueva);
    alert(`Bienvenid@ ${lineaNueva.nombre} a Movijaus`)
}


function bajaLinea() {
    let numeroLinea = parseInt(prompt("Ingrese el numero de linea: "));
    let linea = arrayLineas.find(linea => linea.numeroLinea === numeroLinea);
    let indice = arrayLineas.indexOf(linea);
    let lineaEliminada = arrayLineas.splice(indice, 1);

    alert(`La linea de ${lineaEliminada[0].nombre} ha sido dada de baja.`);
}

function modificarUsuario() {
    let numero = parseInt(prompt("Ingrese el numero de linea: "));
    let linea = arrayLineas.find(linea => linea.numeroLinea === numero);
    let indice = arrayLineas.indexOf(linea);

    let numeroLinea = parseInt(prompt("Ingrese el numero de linea: "));
    let nombre = prompt("Ingrese el nombre de usuario: ");
    let fecha = prompt("Ingrese la fecha de alta ");

    let lineaModificada = new Linea(numeroLinea, nombre, fecha);

    arrayLineas.splice(indice, 1, lineaModificada);
    alert(`La linea de ${lineaModificada.nombre} ha sido dada modificada.`);
}

function consultaAntiguedad() {
    let numeroLinea = parseInt(prompt("Ingrese el numero de linea: "));
    let linea = arrayLineas.filter(linea => linea.numeroLinea === numeroLinea);
    let fecha = linea[0].fecha;
    let nombre = linea[0].nombre;
    alert(`${nombre} esta con nosotros desde ${fecha.toLocaleString()}`);
}

function salir() {
    alert("Gracias por ser Movijaus");
}

let opcion = menu();
switch (opcion) {
    case 1:
        altaLineaNueva();
        break;
    case 2:
        bajaLinea();
        break;
    case 3:
        modificarUsuario();
        break;
    case 4:
        consultaAntiguedad();
        break;
    case 5:
        salir();
        break;
    default:
        alert("Opción incorrecta");
        break;
}