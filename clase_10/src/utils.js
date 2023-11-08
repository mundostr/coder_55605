import * as url from 'url'

// Es un simple archivo "helper" en el que exportamos un par de constantes útiles.
// Estas constantes están disponibles en CommonJS, pero no al usar la sintaxis de módulos
// (type module en package.json), por lo tanto las volvemos a generar.
export const __filename = url.fileURLToPath(import.meta.url)
export const __dirname = url.fileURLToPath(new URL('.', import.meta.url))