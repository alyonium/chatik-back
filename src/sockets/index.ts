import { Server as IOServer } from 'socket.io';
import { Server } from 'http';
import { messageService } from '../services/message.service';
import { tokenService } from '../services/token.service';
import { Message, MessageResponse } from '../models/message';

export const initSocket = (server: Server) => {
  const io = new IOServer(server, {
    cors: {
      origin: process.env.CLIENT_ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  }).of('/chat');

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
    } catch (error: unknown) {
      console.error(error);
      return next(new Error('Invalid token'));
    }
  });

  io.on('connection', async (socket) => {
    const user = socket.data.user;

    console.log('User connected:', socket.id);

    const messages = await messageService.getAll();
    socket.emit('chat history', messages);

    socket.on('new message', async ({ content }: Pick<Message, 'content'>) => {
      const message: MessageResponse = await messageService.create({
        content,
        userId: user.id,
      });

      io.emit('new message', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  console.log('Socket is running in the server.');
};
