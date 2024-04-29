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

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    axios.post('http://localhost:8080/send', {
        "sender_name": msg.sender,
        "string_message": msg.message,
    })
  });
});

app.use(express.json());

app.use(cors({
  "origin": true,
}));

app.post('/receive', (req, res) => {
    const { message, sender, timestamp, error } = req.body;
    console.log(message, sender, timestamp, error);
    io.emit('message', { message, sender, timestamp, error });
    res.sendStatus(200);
});


server.listen(8001, () => {
  console.log('listening on *:8001');
});