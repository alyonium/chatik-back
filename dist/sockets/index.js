"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const message_service_1 = require("../services/message.service");
const token_service_1 = require("../services/token.service");
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: 'http://localhost:5173',
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
            const user = token_service_1.tokenService.validate(token);
            if (!user) {
                return next(new Error('Invalid token'));
            }
            socket.data.user = user;
            next();
        }
        catch (error) {
            console.error(error);
            return next(new Error('Invalid token'));
        }
    });
    io.on('connection', async (socket) => {
        const user = socket.data.user;
        console.log('User connected:', socket.id);
        const messages = await message_service_1.messageService.getAll();
        socket.emit('chat history', messages);
        socket.on('new message', async ({ content }) => {
            const message = await message_service_1.messageService.create({
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
exports.initSocket = initSocket;
