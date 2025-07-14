import { Server as IOServer } from 'socket.io';
import { Server } from 'http';

export const initSocket = (server: Server) => {
  const io = new IOServer(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('message', (msg) => {
      io.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
