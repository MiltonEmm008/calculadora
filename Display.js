// EXPORTA LA CLASE DISPLAY
export default class Display {
  constructor(displayValorAnterior, displayValorActual) {
    // REFERENCIAS A LOS ELEMENTOS DEL DOM
    this.displayValorActual = displayValorActual;
    this.displayValorAnterior = displayValorAnterior;

    // VALOR ACTUAL DEL DISPLAY
    this.valorActual = "";
  }

  // INVIERTE UNA CADENA
  invertirCadena(cad) {
    return cad.split("").reverse().join("");
  }

  // OBTIENE EL ULTIMO NUMERO DE LA EXPRESION
  obtenerNumero(expresion) {
    const fragmentos = expresion.split(/[\+\-\*\/]/);
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
    if (["*", "/", "+", "-"].includes(ultimoChar)) return;

    this.valorActual += " " + operador + " ";
    this.imprimirValores();
  }

  // ACTUALIZA LOS VALORES DEL DISPLAY
  imprimirValores() {
    if (this.displayValorAnterior.textContent === "NaN") {
      this.valorActual = this.valorActual.replace("NaN", "");
      this.displayValorAnterior.textContent = "";
    }

    if (this.displayValorAnterior.textContent !== "") {
      this.displayValorAnterior.textContent = "";
    }

    this.displayValorActual.textContent = this.valorActual;
  }

  // CALCULA E IMPRIME EL RESULTADO DE LA EXPRESION
  imprimirResultado() {
    // VALIDAR SI LA EXPRESION ESTÁ CORRECTA
    if (this.valorActual.trim() === "") {
      this.displayValorAnterior.innerText = "Error: Vacío";
      this.displayValorActual.innerText = "";
      return;
    }

    // VALIDAR SI LA EXPRESION TERMINA CON UN OPERADOR
    if (
      ["+", "-", "*", "/"].includes(
        this.valorActual.trim().charAt(this.valorActual.trim().length - 1)
      )
    ) {
      this.displayValorAnterior.innerText = "Error: Operador incompleto";
      this.displayValorActual.innerText = "";
      return;
    }

    try {
      // EVALUAR LA EXPRESION Y MOSTRAR RESULTADO
      this.valorActual = math.evaluate(this.valorActual).toString();

      // VERIFICAR SI EL RESULTADO ES NaN
      if (isNaN(this.valorActual)) {
        this.valorActual = "Error: Expresión inválida";
      }

      console.log(this.valorActual);
      this.displayValorAnterior.innerText = this.valorActual;
      this.displayValorActual.innerText = "";
    } catch (error) {
      // MANEJAR ERRORES DE EVALUACION
      this.displayValorAnterior.innerText = "Error: Expresión inválida";
      this.displayValorActual.innerText = "";
    }
  }

  // LIMPIA COMPLETAMENTE EL DISPLAY
  limpiarDisplay() {
    this.valorActual = "";
    this.displayValorAnterior.textContent = "";
    this.displayValorActual.textContent = "";
  }

  // BORRA EL ULTIMO CARACTER DE LA EXPRESION
  borrar() {
    if (this.displayValorAnterior.textContent === "NaN") {
      this.valorActual = "";
      this.displayValorAnterior.textContent = "";
    }
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