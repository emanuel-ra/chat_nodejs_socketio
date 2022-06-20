const path = require('path');
const express = require('express');
const app = express();

// settings 
app.set('port', process.env.PORT || 3000);


// static files 
app.use(express.static(path.join(__dirname,'public')));

// start server
const server = app.listen(app.get('port'), ()=>{
    console.log('Server on port ', app.get('port'));
});


// websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);
io.on('connection', (socket)=>{
    console.log('new connection', socket.id);

    socket.on('chat:message', (data)=>{
        //console.log(data);
        io.sockets.emit('chat:message',data);
    });

    socket.on('chat:typing', (data)=>{
        //console.log(data);
        socket.broadcast.emit('chat:typing',data);
    });

});