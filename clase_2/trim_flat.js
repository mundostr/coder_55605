// trim() y otros métodos para trabajo con cadenas, son muy útiles al momento
// de normalizar datos ingresados por el usuario u obtenidos desde otros lugares.
const cadenaRecibida = ' COderHouSe    '
const cadenaNormalizada = cadenaRecibida.trim().toUpperCase()

console.log(cadenaRecibida)
console.log(cadenaRecibida.length)

console.log(cadenaNormalizada)
console.log(cadenaNormalizada.length)

const lecturas = [23, 22, 15, [17, 12], [18, 19, 20], 24, 25, 23, 23]

console.log(lecturas)
// flat es otro de los muchos métodos para trabajo sobre arrays u objetos, de gran utilidad.
// En el ejemplo, vemos como podemos normalizar un array de lecturas, que a veces llegan de
// manera individual y otras veces en pequeños grupos, es decir, el array principal tiene a
// su vez sub-arrays. Flat nos permitirá uniformizar todas las lecturas en un único array consistente
console.log(lecturas.flat(Infinity))