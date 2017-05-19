const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

console.log(publicPath);


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    io.emit('newMessage', {
      to: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });


  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });
});


const port = process.env.PORT || 3000;


server.listen(port, () => {

  console.log(`Server Started on port ${port}`);

});

module.exports = {app};
