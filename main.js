let nombreUsuario = prompt("Por favor ingresa tu nombre: ");
alert("Hola " + nombreUsuario + " bienvenido/a a nuestro sistema de calculos" + "\n(presiona en aceptar)");

let opciones = prompt( nombreUsuario + ", por favor escribi la opcion que desees" + "\n(porcentajes) (operaciones) (sueldo neto)" + "\nsi no, para finalizar escribi 'salir' ")

for(let i = 0; i < 3; i++){
    if(opciones == "porcentajes"){
        let valorPorcentaje = parseInt(prompt("Ingresa el porcentaje que queres saber: "));
        let valorTotal = parseInt(prompt("Ingresa el valor total: "));
        let resultadoPorcentaje = valorTotal * (valorPorcentaje / 100).toFixed(2);

        alert("el " + valorPorcentaje + "% de " + valorTotal + " es: " + resultadoPorcentaje);
        break;
    }else if(opciones == "operaciones"){
        let valorUno = parseInt(prompt("Ingresa un valor"));
        let valorDos = parseInt(prompt("Ingresa el segundo valor"));

        let operacion = prompt("ingresa la operacion \n(+ - * /)");

        switch(operacion){
            case "+":
                alert("El resultado es: " + (valorUno + valorDos));
                break;
            case "-":
                alert("El resultado es: " + (valorUno - valorDos));
                break;
            case "*":
                alert("El resultado es: " + (valorUno * valorDos));
                break;
            case "/":
                alert("El resultado es: " + (valorUno / valorDos));
                break;
            default:
                alert("operacion incorrecta");
                break;
        }
        break
    }else if(opciones == "sueldo neto"){
        let sueldoBruto = parseInt(prompt("Para calcular el sueldo neto, por favor ingrese el valor total del sueldo bruto: "));

        let jubilacion = sueldoBruto * 0.11.toFixed(2);
        let obraSocial = sueldoBruto * 0.03.toFixed(2);
        let LeyPami = sueldoBruto * 0.03.toFixed(2);
        let sueldoNeto = sueldoBruto - jubilacion - obraSocial - LeyPami;

        alert("Total del sueldo bruto: "+ sueldoBruto + "\nDescuentos de jubilacion (11%): " + jubilacion + "\nDescuentos de Obra social (3%): " + obraSocial + "\nDescuentos de Ley 19032 (PAMI) (3%): " + LeyPami + "\nEl sueldo neto total es de: " + sueldoNeto);
        break;
    }
    else if(opciones == "salir"){
        alert("Muchas gracias por utilizar nuestro sistema de calculos, hasta la proxima!")
        break
    }else{
        opciones = prompt("Opcion incorrecta, volve a intentar escribiendo una de las siguientes opciones: " + "\n(porcentajes) (operaciones) (sueldo neto)" + "\nsi no, para finalizar escribi 'salir' ");
    }
}