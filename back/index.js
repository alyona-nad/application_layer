const { default: axios } = require('axios');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(express.json());

app.use(cors({
  "origin": true,
}));

const queue = []

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    const { sender, message } = msg;
    queue.push({ sender, socket });
    axios.post('http://localhost:8080/send', { sender_name: sender, string_message: message });
  });
});

app.post('/receive', (req, res) => {
  console.log(req.body);
  const { message, sender, timestamp, error } = req.body;

  let foundIndex = -1;
  const foundSocket = queue.find((item, index) => {
    if (item.sender === sender) {
      foundIndex = index;
      return true;
    }
    return false;
  })?.socket;

  if (foundSocket) {
    if (foundIndex !== -1) {
      queue.splice(foundIndex, 1);
    }

    if (error) {
      foundSocket.emit('error');
      res.sendStatus(200);
      return;
    }
  }
  if (error) {
    res.sendStatus(200);
    return;
  }
  io.emit('message', { message, sender, timestamp, error });
  res.sendStatus(200);
});


server.listen(8001, () => {
  console.log('listening on *:8001');
});