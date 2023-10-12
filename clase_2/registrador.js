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
}


const manager = new TicketManager()
manager.agregarEvento('Evento 1', 'Rafaela', 3000, 100)