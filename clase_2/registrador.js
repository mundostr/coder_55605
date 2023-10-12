<<<<<<< HEAD
class TicketManager {
    static #precioBaseDeGanancia = 500
    
    constructor() {
        this.eventos = []
    }

    getEventos() {
        this.eventos.forEach((evento) => {
            console.log(evento)
        })
    }

    agregarEvento(nombre, lugar, precio, capacidad, fecha) {
        const nuevoEvento = {
            id: 'autoincrementable',
            nombre: nombre,
            lugar: lugar,
            precio: precio + 0.15,
            capacidad: capacidad || 50,
            fecha: fecha || new Date().toLocaleString()
        }

        console.log(nuevoEvento)
    }

    agregarUsuario() {}

    ponerEventoEnGira() {}
=======
/**
 * HOL clase 2
 * Creación de clase para gestión de usuarios que desean acceder a eventos
 */

class TicketManager {
    static contadorEventos = 0
    static contadorUsuarios = 0
    #precioBaseDeGanancia = 1000

    constructor() {
        this.eventos = []
        this.usuarios = []
    }

    getEventos() {
        this.eventos.forEach(evento => console.log(evento))
    }

    getUsuarios() {
        this.usuarios.forEach(usuario => console.log(usuario))
    }

    /**
     * Recibe 5 parámetros
     * - incrementa el contador general de eventos para que cada evento tenga su propio id.
     * - arma el objeto de un nuevo evento.
     * - lo agrega al array eventos.
     * 
     * Aprovechamos el operador OR (doble pipe) ||, para dar a capacidad y fecha
     * valores predeterminados si no son recibidos como parámetros
     */
    addEvento(nombre, lugar, precio, capacidad, fecha) {
        TicketManager.contadorEventos++
        
        const nuevoEvento = {
            id: TicketManager.contadorEventos,
            nombre: nombre,
            lugar: lugar,
            precio: precio + this.#precioBaseDeGanancia + 0.15,
            capacidad: capacidad || 50,
            fecha: fecha || new Date().toLocaleString(),
            participantes: []
        }

        this.eventos.push(nuevoEvento)
    }

    /**
     * Recibe 2 parámetros
     * - incrementa el contador general de usuarios para que cada usuario tenga su propio id.
     * - arma el objeto de un usuario nuevo, pasando el apellido a mayúsculas.
     * - lo agrega al array usuarios.
     */
    addUsuario(apellido, nombre) {
        TicketManager.contadorUsuarios++

        const nuevoUsuario = {
            id: TicketManager.contadorUsuarios,
            apellido: apellido.toUpperCase(),
            nombre: nombre
        }

        this.usuarios.push(nuevoUsuario)
    }

    /**
     * Agrega un id de usuario a la lista de participantes de un evento,
     * verificando previamente que tanto el evento como el usuario existan
     * Para ello aprovechamos el método findIndex que nos devuelve el índice (posición)
     * en el array, del primer elemento que coincide con el criterio buscado.
     * Si no encuentra elementos, retorna -1
     */
    addUsuarioAEvento(idUsuario, idEvento) {
        const indexUsuario = this.usuarios.findIndex((usuario) => { return usuario.id === idUsuario })
        const indexEvento = this.eventos.findIndex((evento) => { return evento.id === idEvento })
        
        if (indexUsuario !== -1 && indexEvento !== -1) {
            this.eventos[indexEvento].participantes.push(idUsuario)
        }
    }

    /**
     * "Copia" los datos del evento indicado, aprovechando el operador spread,
     * agrega nueva localidad y fecha, con un array de participantes vacío, para
     * generar un nuevo evento y agregarlo al array de eventos.
     */
    ponerEventoEnGira(idEvento, localidad, nuevaFecha) {
        const indexEvento = this.eventos.findIndex((evento) => { return evento.id === idEvento })

        if (indexEvento !== -1) {
            TicketManager.contadorEventos++

            const nuevoEvento = {
                ...this.eventos[indexEvento],
                id: TicketManager.contadorEventos,
                lugar: localidad,
                fecha: nuevaFecha || new Date().toLocaleString(),
                participantes: []
            }

            this.eventos.push(nuevoEvento)
        }
    }
>>>>>>> clase_2
}


const manager = new TicketManager()
<<<<<<< HEAD
manager.agregarEvento('Evento 1', 'Rafaela', 3000, 100)
=======

manager.addEvento('CoderWorkshop', 'Córdoba', 2000, 100)
manager.addEvento('CoderWorkshop II', 'Misiones', 3000, 100)
manager.addUsuario('Perren', 'Carlos')
manager.addUsuarioAEvento(1, 2)
manager.ponerEventoEnGira(1, 'Rafaela')
manager.getEventos()
>>>>>>> clase_2
