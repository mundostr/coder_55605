// Creamos un nuevo CLIENTE de socket.io
const socketClient = io();

// Generamos un par de constantes que hacen referencia al campo input y al botón del formulario, así
// podemos manejarlos desde aquí
const message = document.getElementById("message");
const received_messages = document.getElementById("received_messages");

// Este array es solo demostrativo, los datos de usuario normalmente se cotejarán contra una base de datos
const users = [
  { id: 1, firstName: "Carlos", lastName: "Perren", userName: "cperren" },
  { id: 2, firstName: "Juan", lastName: "Perez", userName: "jperez" },
  { id: 3, firstName: "Carolina", lastName: "Ferrero", userName: "cferrero" },
];

let user = "";

// Ponemos el cliente a "escuchar" por el tópico 'user_connected', para recibir
// notificación cuando otro cliente se conecte.
socketClient.on("user_connected", (data) => {
  Swal.fire({
    text: `${data.user.firstName} ${data.user.lastName} se ha conectado!`,
    toast: true,
    position: "top-right",
  });
});

// Este tópico messagesLogs es emitido por el servidor cada vez que recibe un mensaje de chat
// nuevo de alguno de los clientes. De esa forma recibimos aviso y podemos actualizar el párrafo
// con la lista de mensajes
socketClient.on("messagesLogs", (data) => {
  let messages = "";
  data.forEach((message) => {
    messages += `[${message.user.userName}] ${message.message}<br />`;
  });
  received_messages.innerHTML = messages;
});

// Emite un tópico message con el nuevo mensaje al pulsar el botón Enviar, manda
// además el nombre del usuario conectado con esta instancia del chat
const sendMessage = () => {
  if (message.value.trim() !== "") {
    socketClient.emit("message", { user: user, message: message.value.trim() });
    message.value = "";
  }
};

// Pide con una ventana sweetalert el nombre de usuario.
// Si es correcto, emite un evento user_connected, caso contrario muestra otra ventana avisando del error
// y vuelve a autenticar
const authenticate = () => {
  Swal.fire({
    title: "Identificación",
    input: "text",
    text: "Ingresar usuario:",
    inputValidator: (value) =>
      !value && "se debe especificar un nombre de usuario!",
    allowOutsideClick: false,
  }).then((res) => {
    // user = res.value

    user = users.find((user) => user.userName === res.value);
    if (user === undefined) {
      Swal.fire({
        text: "Usuario no válido",
        toast: true,
        position: "top-right",
      }).then((res) => {
        authenticate();
      });
    } else {
      socketClient.emit("user_connected", { user: user });
    }
  });
};

authenticate();
