const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let players = {};

wss.on("connection", (ws) => {
  const id = Date.now().toString();
  players[id] = { x: 50, y: 50 };

  ws.on("message", (message) => {
    players[id] = JSON.parse(message);
    broadcast();
  });

  ws.on("close", () => {
    delete players[id];
    broadcast();
  });
});

function broadcast() {
  const data = JSON.stringify(players);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

server.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
