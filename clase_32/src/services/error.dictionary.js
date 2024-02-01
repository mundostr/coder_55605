/**
 * Diccionario para centralizar códigos y textos de errores, puede
 * colocarse en el config general también
 */

const errorsDictionary = {
    ROUTING_ERROR: { code: 404, message: 'No se encuentra el endpoint solicitado' },
    FEW_PARAMETERS: { code: 400, message: 'Faltan parámetros obligatorios o están vacíos' },
    INVALID_MONGOID_FORMAT: { code: 400, message: 'El ID no contiene un formato válido de MongoDB' },
    INVALID_PARAMETER: { code: 400, message: 'El parámetro ingresado no es válido' },
    INVALID_TYPE_ERROR: { code: 400, message: 'No corresponde el tipo de dato' },
    ID_NOT_FOUND: { code: 400, message: 'No existe registro con ese ID' },
    PAGE_NOT_FOUND: { code: 404, message: 'No se encuentra la página solicitada' },
    DATABASE_ERROR: { code: 500, message: 'No se puede conectar a la base de datos' },
    INTERNAL_ERROR: { code: 500, message: 'Error interno de ejecución del servidor' },
    RECORD_CREATION_ERROR: { code: 500, message: 'Error al intentar crear el registro' },
    
    RECORD_CREATION_OK: { code: 200, message: 'Registro creado' },
}

export default errorsDictionary;