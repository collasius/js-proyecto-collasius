let nombreUsuario = prompt("Por favor ingrese su nombre: ");
alert("Hola " + nombreUsuario + " bienvenido/a a nuestro sistema de calculos" + "\n(presione en aceptar)");

let opciones = prompt( nombreUsuario + ", por favor escribi la opcion que desees" + "\n(porcentajes) (operaciones) (sueldo neto)" + "\nsino escriba 'salir' ")

for(let i = 0; i < 2; i++){
    if(opciones == "porcentajes"){
        let valorPorcentaje = parseInt(prompt("Ingrese el porcentaje que quiere saber: "));
        let valorTotal = parseInt(prompt("Ingrese el valor total: "));
        let resultadoPorcentaje = valorTotal * (valorPorcentaje / 100);

        alert("el " + valorPorcentaje + "% de " + valorTotal + " es: " + resultadoPorcentaje.toFixed(2));
        break;
    }else if(opciones == "operaciones"){
        let valorUno = parseInt(prompt("Ingrese un valor"));
        let valorDos = parseInt(prompt("Ingrese el segundo valor"));

        let operacion = prompt("ingrese la operacion(+ - * /)");

        switch(operacion){
            case "+":
                alert(valorUno + valorDos);
                break;
            case "-":
                alert(valorUno - valorDos);
                break;
            case "*":
                alert(valorUno * valorDos);
                break;
            case "/":
                alert(valorUno / valorDos);
                break;
            default:
                alert("operacion incorrecta");
                break;
        }
        break
    }else if(opciones == "salir"){
        alert("Muchas gracias por utilizar nuestro sistema de calculos, hasta la proxima!")
        break
    }else{
        opciones = prompt("Opcion incorrecta, vuelva a intentar escribiendo una de las siguientes opciones: " + "\n(porcentajes) (operaciones) (sueldo neto)" + "\nsino escriba 'salir' ");
    }
}