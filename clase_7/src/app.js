import express from 'express'

const PORT = 8080

let phrase = 'Frase inicial'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Endpoint GET que solo retorna la frase actual completa
app.get('/api/phrase', (req, res) => {
    res.status(200).send({ phrase: phrase })
})

// Endpoint GET que recibe un parámetro pos, y retornar solo la palabra de la frase en esa posición
app.get('/api/words/:pos', (req, res) => {
    try {
        const pos = parseInt(req.params.pos)
        const wordsInPhrase = phrase.split(' ')

        if (isNaN(pos) || pos < 1 || pos > wordsInPhrase.length) {
            // A partir de ahora, SIEMPRE retornaremos un código de estado junto con la respuesta
            res.status(400).send({ err: 'Indicador de posición no válido' })
        } else {
            res.status(200).send({ searched: wordsInPhrase[pos - 1] })
        }
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})

/**
 * Hasta ahora nos estuvimos manejando solo con solicitudes tipo GET, a partir de este momento,
 * agregaremos otras (POST, PUT, DELETE). En este caso el endpoint recibirá datos en la,
 * solicitud, estos datos estarán dentro del objeto rec.body.
 */
app.post('/api/words', (req, res) => {
    // Comenzamos a usar try / catch
    try {
        // Verificamos que en el body tengamos una key llamada word, y que no esté en blanco
        if (!req.body.hasOwnProperty('word') || req.body.word === '') {
            res.status(400).send({ err: 'El body debe contener un key con nombre "word", que indique la palabra a agregar' })
        } else {
            // Aprovechamos las template strings para agregar la palabra indicada en el body al final de la frase
            // Luego con split, separamos la frase en un array de palabras.
            phrase = `${phrase} ${req.body.word}`
            const wordsInPhrase = phrase.split(' ')

            res.status(200).send({ added: req.body.word, pos: wordsInPhrase.length })
        }
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})

/**
 * Este endpoint utilizará PUT. Recibirá tanto un parámetro a través de req.params, como un body
 * con una palabra, reemplazará la posición indicada en req.params.pos por esta nueva palabra
 */
app.put('/api/words/:pos', (req, res) => {
    try {
        const pos = parseInt(req.params.pos)
        const wordsInPhrase = phrase.split(' ')

        // Combinamos los chequeos de los dos endpoints anteriores
        if (isNaN(pos) || pos < 1 || pos > wordsInPhrase.length || !req.body.hasOwnProperty('word') || req.body.word === '') {
            res.status(400).send({ err: 'El parámetro pos debe ser un entero positivo y el body debe contener un key con nombre "word", que indique la palabra a agregar' })
        } else {
            // Almacenamos la palabra previa, ya que en el ejercicio se solicita devolver esta polabra en la respuesta
            // Actualizamos la posición del array con la nueva palabra, y aprovechamos el método join() para volver
            // a arma la nueva frase.
            const previousWord = wordsInPhrase[pos - 1]
            wordsInPhrase[pos - 1] = req.body.word
            phrase = wordsInPhrase.join(' ')

            res.status(200).send({ updated: req.body.word, previous: previousWord })
        }
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})

/**
 * Este endpoint utilizará DELETE. Recibirá también un req.params.pos, para indicar la palabra a borrar.
 */
app.delete('/api/words/:pos', (req, res) => {
    try {
        const pos = parseInt(req.params.pos)
        const wordsInPhrase = phrase.split(' ')

        if (isNaN(pos) || pos < 1 || pos > wordsInPhrase.length) {
            res.status(400).send({ err: 'Indicador de posición no válido' })
        } else {
            // Almacenamos la palabra antes de borrar, ya que nuevamente el ejercicio pide indicarla en la respuesta.
            const deletedWord = wordsInPhrase[pos - 1]
            // Aprovechamos el método splice() para borrar items en el array
            wordsInPhrase.splice(pos - 1, 1)
            // Generamos la frase actualizada, uniendo el array con join()
            phrase = wordsInPhrase.join(' ')
            res.status(200).send({ deleted: deletedWord })
        }
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor Express activo en puerto ${PORT}`)
})