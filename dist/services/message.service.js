"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageService = void 0;
const message_sql_1 = require("../db/message.sql");
const create = async ({ userId, content, }) => {
    if (!userId || !content) {
        throw new Error('Not enough content');
    }
    const message = await message_sql_1.messageDB.create({ userId, content });
    if (!message) {
        throw new Error('Message not created');
    }
    return message;
};
const getAll = async () => {
    const messages = await message_sql_1.messageDB.getAll();
    if (!messages || !messages.length) {
        throw new Error('Error');
    }
    return messages;
};
exports.messageService = {
    create,
    getAll,
};
