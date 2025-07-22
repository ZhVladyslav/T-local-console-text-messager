const WebSocket = require('ws');
const readline = require('readline');

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', function connection(ws) {
  console.log('📲 New client connected');
  clients.push(ws);

  ws.on('message', function incoming(message) {
    console.log(message.toString());
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
    clients = clients.filter(client => client !== ws);
  });

  ws.send('👋 Hello from server');
});

// Створення інтерфейсу читання з консолі
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (line) {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(line);
    }
  });
});
