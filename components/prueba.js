var lista = ['Brais', 'Begoña', 'Bianca', 'Bruno']

var topeMaximo = lista.length

// Esta función al ejecutarse la primera vez lo hará en cuanto se haga el renderizado de los componentes. A posteriori se ejecutará cuando se pulse el botón de descanso.
function insertarDatosEjercicio() {
  let contador = 0
  if (contador < topeMaximo) {
    console.log(lista[contador])
    contador++
  }
}

var relax = 10 // El valor de esta variable será el obtenido por el objeto "ejercicio"

function countDown() {
  setInterval(function () {
    if (relax > 0) {
      relax--
      console.log(relax)
    }

  }, 1000)
}

countDown()
// async function someFunction() {
//   for (let contador = 0; contador < lista.length; contador++) {
//     // wait for the promise to resolve before advancing the for loop
//     await asynchronousProcess()
//     console.log(contador)
//   }
// }

console.log(topeMaximo)