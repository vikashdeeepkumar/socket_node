import express from 'express';
import { createServer } from 'node:http';
import { Socket } from 'node:net';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);


const io =new Server(server);

//middlewares
app.use(express.static('public'));

app.get('/', (req, res) => {
  return res.sendFile('index.html');
});


io.on('connection',(socket)=>{
    console.log("a user connected",socket.id);
    socket.on('message',(msg,arg1)=>{
      console.log(msg);
      console.log(arg1);
      io.emit('message',msg,{"anything":"this is from server side"});
    })
})

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});