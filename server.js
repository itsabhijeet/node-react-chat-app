import WebSocket from 'ws';

const webSocketServer = new WebSocket.Server({ port: 5000}, () => "Ws server on port 5000");

webSocketServer.on("connection", (ws) => {
    console.log("connected");

    ws.on("message", (data) => {

        webSocketServer.clients.forEach((client) => {
            // send message to each client other than current
            if(client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })        
    })
})
