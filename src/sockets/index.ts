import { Server as IOServer } from 'socket.io';
import { Server } from 'http';
import { messageService } from '../services/message.service';
import { tokenService } from '../services/token.service';

export const initSocket = (server: Server) => {
  const io = new IOServer(server);

  io.use((socket, next) => {
    const tokenWithBearer = socket.handshake.auth.token;

    if (!tokenWithBearer) {
      return next(new Error('Authentication token missing'));
    }

    const token = tokenWithBearer.split(' ')[1]; // убрать Bearer

    try {
      const user = tokenService.validate(token);
      if (!user) {
        return next(new Error('Invalid token'));
      }

      socket.data.user = user;
      next();
    } catch (err) {
      return next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('message', async (msg) => {
      await messageService.create(msg);
      io.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  console.log('Socket is running in the server.');
};
