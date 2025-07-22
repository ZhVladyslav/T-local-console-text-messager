const WebSocket = require("ws");
const readline = require("readline");

const ip = "192.168.187.10:8080";

const ws = new WebSocket(`ws://${ip}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

ws.on("open", function open() {
  console.log("📲 New client connected");

  rl.on("line", function (line) {
    ws.send(line);
  });
});

ws.on("message", function incoming(message) {
  console.log(message.toString());
});

ws.on("close", () => {
  console.log("❌ Client disconnected");
});
