// CLASE PARA CONTENER LOS MÉTODOS DEL ALGORITMO SHUNTING YARD Y SU EVALUACIÓN
export default class Calculadora {
  // FUNCIÓN PARA CONVERTIR UNA EXPRESIÓN INFIJA A POSTFIJA USANDO SHUNTING-YARD
  infixToPostfix(expresion) {
    // SE DEFINE LA PRECEDENCIA DE LOS OPERADORES
    const precedencia = { "+": 1, "-": 1, X: 2, "/": 2 };

    // ARRAY PARA OPERADORES (FUNCIONA COMO UNA PILA)
    const operadores = [];

    // ARRAY PARA LA SALIDA EN NOTACIÓN POSTFIJA
    const salida = [];

    // TOKENIZAMOS LA EXPRESIÓN (EXTRAEMOS NÚMEROS Y OPERADORES)
    // EJEMPLO: "3.5+2X4" → ["3.5", "+", "2", "X", "4"]
    const tokens = expresion.match(/(\d+(\.\d*)?|\.\d+)|[+\-X/]/g);

    // RECORREMOS CADA TOKEN UNO POR UNO
    tokens.forEach((token) => {
      if (!isNaN(token)) {
        // SI EL TOKEN ES UN NÚMERO, LO AGREGAMOS DIRECTAMENTE A LA SALIDA
        salida.push(token);
      } else {
        // SI ES UN OPERADOR (+, -, X, /)
        // MIENTRAS haya operadores en la pila Y
        // el operador en la cima tenga mayor o igual precedencia que el actual,
        // los sacamos y los mandamos a la salida
        while (
          operadores.length &&
          precedencia[operadores[operadores.length - 1]] >= precedencia[token]
        ) {
          salida.push(operadores.pop());
        }
        // FINALMENTE, agregamos el operador actual a la pila
        operadores.push(token);
      }
    });

    // CUANDO YA NO HAY MÁS TOKENS, SACAMOS TODOS LOS OPERADORES RESTANTES
    while (operadores.length) {
      salida.push(operadores.pop());
    }

    // RETORNAMOS EL ARRAY EN FORMA POSTFIJA (LISTO PARA EVALUAR)
    return salida;
  }

  // FUNCIÓN PARA EVALUAR UNA EXPRESIÓN POSTFIJA (RPN)
  evaluarPostfija(postfija) {
    // SE USA UNA PILA PARA GUARDAR LOS OPERANDOS
    const pila = [];

    // RECORREMOS CADA TOKEN DE LA EXPRESIÓN POSTFIJA
    postfija.forEach((token) => {
      if (!isNaN(token)) {
        // SI EL TOKEN ES UN NÚMERO, LO CONVERTIMOS A FLOAT Y LO METEMOS A LA PILA
        pila.push(parseFloat(token));
      } else {
        // SI ES UN OPERADOR, SACAMOS LOS DOS ÚLTIMOS NÚMEROS DE LA PILA
        const b = pila.pop(); // SEGUNDO OPERANDO
        const a = pila.pop(); // PRIMER OPERANDO

        // REALIZAMOS LA OPERACIÓN SEGÚN EL TIPO DE OPERADOR
        switch (token) {
          case "+":
            pila.push(a + b);
            break;
          case "-":
            pila.push(a - b);
            break;
          case "X":
            pila.push(a * b);
            break;
          case "/":
            pila.push(a / b);
            break;
        }
      }
    });

    // EL ÚLTIMO ELEMENTO DE LA PILA ES EL RESULTADO FINAL
    return pila.pop();
  }

  // FUNCIÓN GENERAL QUE LLAMA A LOS PASOS ANTERIORES
  evaluarExpresion(expresion) {
    // LIMPIAMOS ESPACIOS EN BLANCO DE LA EXPRESIÓN (POR SI ACASO)
    expresion = expresion.replace(/\s+/g, "");

    // CONVERTIMOS A POSTFIJA Y LUEGO EVALUAMOS
    const postfija = this.infixToPostfix(expresion);
    return this.evaluarPostfija(postfija);
  }
}