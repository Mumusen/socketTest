var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  })
  socket.on('chat name', function(data){
    io.emit('chat name', data);
  })
  socket.on('over name', function(data){
    io.emit('over name', data);
  })
})

http.listen(port, function(){
  console.log('listening on *:' + port);
});