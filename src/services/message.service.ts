import { messageDB } from '../db/message.sql';
import { Message, MessageResponse } from '../models/message';

const create = async ({
  userId,
  content,
}: Message): Promise<MessageResponse> => {
  if (!userId || !content) {
    throw new Error('Not enough content');
  }

  const message = await messageDB.create({ userId, content });

  if (!message) {
    throw new Error('Message not created');
  }

  return message;
};

const getAll = async (): Promise<MessageResponse[]> => {
  const messages = await messageDB.getAll();

  if (!messages) {
    throw new Error('Error');
  }

  return messages;
};

export const messageService = {
  create,
  getAll,
};
