// IMPORTA LA CLASE CALCULADORA
import Calculadora from "./Calculadora.js";

// EXPORTA LA CLASE DISPLAY
export default class Display {
  constructor(displayValorAnterior, displayValorActual) {
    // REFERENCIAS A LOS ELEMENTOS DEL DOM
    this.displayValorActual = displayValorActual;
    this.displayValorAnterior = displayValorAnterior;

    // INSTANCIA DE LA CALCULADORA
    this.calculador = new Calculadora();

    // VALOR ACTUAL DEL DISPLAY
    this.valorActual = "";
  }

  // INVIERTE UNA CADENA
  invertirCadena(cad) {
    return cad.split("").reverse().join("");
  }

  // OBTIENE EL ULTIMO NUMERO DE LA EXPRESION
  obtenerNumero(expresion) {
    const fragmentos = expresion.split(/[\+\-X\/]/);
    return fragmentos[fragmentos.length - 1];
  }

  // AGREGA UN NUMERO A LA EXPRESION
  agregarNumero(numero) {
    let ultimoNumero = this.obtenerNumero(this.valorActual);

    // EVITA MAS DE UN PUNTO DECIMAL EN UN MISMO NUMERO
    if (numero === "." && ultimoNumero.includes(".")) return;

    this.valorActual += numero;
    this.imprimirValores();
  }

  // AGREGA UN OPERADOR A LA EXPRESION
  agregarOperador(operador) {
    const tokens = this.valorActual.trim().split(" ");
    const ultimoChar = tokens[tokens.length - 1];

    // EVITA AGREGAR DOS OPERADORES SEGUIDOS
    if (["X", "/", "+", "-"].includes(ultimoChar)) return;

    this.valorActual += " " + operador + " ";
    this.imprimirValores();
  }

  // ACTUALIZA LOS VALORES DEL DISPLAY
  imprimirValores() {
    if (this.displayValorAnterior.textContent !== "") {
      this.displayValorAnterior.textContent = "";
    }

    this.displayValorActual.textContent = this.valorActual;
  }

  // CALCULA E IMPRIME EL RESULTADO DE LA EXPRESION
  imprimirResultado() {
    this.valorActual = this.calculador
      .evaluarExpresion(this.valorActual)
      .toString();

    console.log(this.valorActual);
    this.displayValorAnterior.innerText = this.valorActual;
    this.displayValorActual.innerText = "";
  }

  // LIMPIA COMPLETAMENTE EL DISPLAY
  limpiarDisplay() {
    this.valorActual = "";
    this.displayValorAnterior.textContent = "";
    this.displayValorActual.textContent = "";
  }

  // BORRA EL ULTIMO CARACTER DE LA EXPRESION
  borrar() {
    this.valorActual = this.valorActual.substring(
      0,
      this.valorActual.length - 1
    );

    if (this.displayValorAnterior.textContent !== "") {
      this.displayValorAnterior.textContent = "";
    }

    this.displayValorActual.textContent = this.valorActual;
  }
}