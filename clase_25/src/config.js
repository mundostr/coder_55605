/**
 * Colocamos todos los datos de configuración en un archivo por separado, para más orden.
 * En los demás archivos del proyecto, utilizaremos siempre referencias al objeto config
 * que estamos exportando acá.
 */

import dotenv from 'dotenv';
import { Command } from 'commander';

/**
 * dotenv permite leer variables de entorno desde un archivo.
 * Al ejecutar su método config<(), las agrega al process.env para que podamos usarlas.
 * 
 * Por defecto busca el archivo con nombre .env en el raíz del proyecto (donde está package.json),
 * si se desea especificar otra ruta, se puede indicar con el elemento path:
 * dotenv.config({ path: 'ruta/archivo/.env'});
 */
dotenv.config();

/**
 * Commander es un módulo muy práctico para parsear opciones de línea de comandos
 * En este ejemplo indicamos que nos interesa parsear las opciones --mode y --port,
 * por supuesto podría ser cualquier otra que necesitemos, solo tenemos que agregarlas
 * con .option.
 * 
 * El objeto commandLineOptions.opts() contendrá la lista de opciones para fácil acceso.
 */
const commandLineOptions = new Command();
commandLineOptions
    .option('--mode <mode>')
    .option('--port <port>')
commandLineOptions.parse()

/**
 * Combinando variables de entorno, opciones de línea de comandos y valores fijos,
 * armamos nuestro objeto config, que importaremos para usar en cualquier archivo
 * de nuestro proyecto.
 */
const config = {
    PORT: commandLineOptions.opts().port || 3000,
    MONGOOSE_URL: process.env.MONGOOSE_URL_REMOTE,
    SECRET_KEY: process.env.SECRET_KEY,
    UPLOAD_DIR: 'public/img',
    GITHUB_AUTH: {
        clientId: process.env.GITHUB_AUTH_CLIENT_ID,
        clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET,
        // Atención!: si bien podemos rearmar la url de callback acá con el puerto que deseemos,
        // debemos estar atentos a actualizarla también en la config de la app que hemos activado en Github
        callbackUrl: `http://localhost:${commandLineOptions.opts().port || 3000}/api/auth/githubcallback`
    },
    GOOGLE_AUTH: {
        clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        // Atención!: si bien podemos rearmar la url de callback acá con el puerto que deseemos,
        // debemos estar atentos a actualizarla también en la config de la app que hemos activado en Google
        callbackUrl: `http://localhost:${commandLineOptions.opts().port || 3000}/api/auth/googlecallback`
    }
};

export default config;