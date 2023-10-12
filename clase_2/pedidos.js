const pedidos = [
  { manzanas: 3, peras: 2, carne: 1, jugos: 5, dulces: 3 },
  { manzanas: 1, sandias: 1, huevos: 6, jugos: 1, panes: 4 },
]

const tipos = []
// Recorremos el array pedidos con forEach
pedidos.forEach((pedido) => {
  // Utilizamos Object.keys para obtener solo los keys de cada item.
  const keys = Object.keys(pedido)
  
  // Recorremos ahora el array de keys, y solo si tipos NO incluye el key actual, se lo agregamos
  keys.forEach((key) => {
    if (!tipos.includes(key)) tipos.push(key)
  })
})
console.log(tipos)

let total = 0
pedidos.forEach((pedido) => {
  // Volvemos a recorrer pedidos, pero esta vez extrayendo solo los valores
  const values = Object.values(pedido)
  
  // Vamos acumulando total, utilizando un forEach
  values.forEach((value) => {
    total += value
  })

  // También podríamos hacerlo aprovechando reduce
  // total += values.reduce((prev, act) => prev += act)
})
console.log(total)