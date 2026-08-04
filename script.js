const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Pantalla completa
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: 50, y: 50 };
let players = {};

const gridSize = 30; // tamaño de cada cuadrito
const colors = ["purple", "red", "blue", "green", "yellow", "orange", "cyan", "pink"];

const socket = new WebSocket("wss://tu-servidor.repl.co"); // URL de tu servidor en Replit

socket.onmessage = (event) => {
  players = JSON.parse(event.data);
  draw();
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.y -= gridSize;
  if (e.key === "ArrowDown") player.y += gridSize;
  if (e.key === "ArrowLeft") player.x -= gridSize;
  if (e.key === "ArrowRight") player.x += gridSize;
  socket.send(JSON.stringify(player));
});

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  let index = 0;
  for (let id in players) {
    let p = players[id];
    ctx.fillStyle = colors[index % colors.length];
    ctx.fillRect(p.x, p.y, gridSize, gridSize);
    index++;
  }
}
