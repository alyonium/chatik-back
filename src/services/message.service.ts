import { messageDB } from '../db/message.sql';
import { Message } from '../models/message';

const create = async ({ userId, content }: Message) => {
  if (!userId || !content) {
    throw new Error('Error');
  }

  const message = await messageDB.create({ userId, content });

  return { message };
};

export const messageService = {
  create,
};
