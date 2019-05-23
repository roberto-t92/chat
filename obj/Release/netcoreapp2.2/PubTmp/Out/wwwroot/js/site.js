//crear conexion
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/Chat/chatHub")
    .build();

//recibir el mensaje
connection.on("ReceiveMessage", (user, message) => {
    const objDate = new Date(),
        hr = objDate.getHours(),
        min = (objDate.getMinutes() < 10 ? '0' : '') + objDate.getMinutes(),
        seg = (objDate.getSeconds() < 10 ? '0' : '') + objDate.getSeconds();
    let hora = hr + ":" + min + ":" + seg;    

    const receiveHora = hora;
    const receiveMessage = user + ": " + message;        
    const li = document.createElement("li");    

    li.textContent = receiveHora + " " + receiveMessage;
    document.getElementById("messageList").appendChild(li);
})

connection.start().catch(err => console.error(err.toString()));

//enviar mensaje
document.getElementById("sendMessage").addEventListener("click", event => {
    const user = document.getElementById("userName").value;
    const message = document.getElementById("userMessage").value;

    connection.invoke("sendMessage", user, message).catch(err => console.error(err.toString()));
    event.preventDefault();
});

