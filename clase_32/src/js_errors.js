/**
 * Breve repaso de generación de errores en JS, luego integraremos esta clase en nuestra app.
 */

const a = 3;
const b = '6';

// Generamos una clase básica personalizada, que hereda de la clase Error de JS
class CustomError extends Error {
    constructor(obj) {
        super(obj.message);
        this.code = obj.code;
        this.origin = obj.origin;
        this.isCustom = obj.isCustom;
    }
}

try {
    if (typeof(a) === 'number' && typeof(b) === 'number') {
        console.log(a * b);
    } else {
        // Vemos 3 opciones para disparar errores

        // 1) Disparamos con contenido personalizado
        // throw ({ code: -3, message: 'Ambos deben ser numéricos (contenido personalizado)' });
        
        // 2) Disparamos instanciando clase standard Error
        // throw new Error('Ambos deben ser numéricos (clase Error)');

        // 3) Disparamos instanciando clase personalizada
        throw new CustomError({ code: -3, message: 'Ambos deben ser numéricos (clase CustomError)'});
    }
} catch (err) {
    console.log(err.code);
    console.log(err.message);
}