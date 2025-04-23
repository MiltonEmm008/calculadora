// IMPORTA LA CLASE CALCULADORA
import Calculadora from "./Calculadora.js";

// IMPORTA LA CLASE DISPLAY
import Display from "./Display.js";

// OBTIENE REFERENCIAS A LOS ELEMENTOS DEL DISPLAY
const displayValorAnterior = document.getElementById("valor-anterior");
const displayValorActual = document.getElementById("valor-actual");

// OBTIENE TODOS LOS BOTONES DE NUMERO
const botonesNumeros = document.querySelectorAll(".numero");

// OBTIENE TODOS LOS BOTONES DE OPERADOR
const botonesOperadores = document.querySelectorAll(".operador");

// OBTIENE BOTONES DE IGUAL, LIMPIAR Y BORRAR
const botonIgual = document.getElementById("igual");
const botonLimpiar = document.getElementById("limpiar");
const botonBorrar = document.getElementById("borrar");

// CREA UNA INSTANCIA DE DISPLAY
const display = new Display(displayValorAnterior, displayValorActual);

// AGREGA EVENTO PARA BOTON IGUAL
botonIgual.addEventListener("click", () => display.imprimirResultado());

// AGREGA EVENTO PARA BOTON BORRAR
botonBorrar.addEventListener("click", () => display.borrar());

// AGREGA EVENTO PARA BOTON LIMPIAR
botonLimpiar.addEventListener("click", () => display.limpiarDisplay());

// AGREGA EVENTO PARA CADA BOTON DE NUMERO
botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", () => display.agregarNumero(boton.innerText));
});

// AGREGA EVENTO PARA CADA BOTON DE OPERADOR
botonesOperadores.forEach((boton) => {
  boton.addEventListener("click", () =>
    display.agregarOperador(boton.innerText)
  );
});

// CREA UNA INSTANCIA DE CALCULADORA
const calculadora = new Calculadora();

// EJEMPLO DE USO:
let entrada = ".5 X 5";
console.log(calculadora.evaluarExpresion(entrada)); // IMPRIME EL RESULTADO DE LA EXPRESION