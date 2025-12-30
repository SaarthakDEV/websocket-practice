import http from "http";
import WebSocket, { WebSocketServer} from "ws";


const server = http.createServer((request: any, response: any) => {
    console.log(request.url);
    response.end("Hi")
})

const wss = new WebSocketServer({ server });
let connectedUser = 0 


wss.on('connection', (socketInstance: any) => {
    console.log(socketInstance)
    socketInstance.on('error', console.error)

    socketInstance.on('message', (data: any, isBinary: boolean) => {

        // All the client connected to this web socket connection
        wss.clients.forEach(client => {

            // Check if connection is open or not
            if(client.readyState === WebSocket.OPEN){
                // Emit data to clients
                client.send(data, { binary: isBinary });
            }
        })
    console.log(data)
})

    // Connection message when a client is connected
    socketInstance.send(`Connected user count ${++connectedUser}`)
});


server.listen(8080, () => {
    console.log("Server is running on port 8080")
})