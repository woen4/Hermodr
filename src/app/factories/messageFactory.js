import MessageService from '../services/messageService';
import MessageRepository from '../repositories/messageRepository';

function generateInstance() {
  const messageRepository = new MessageRepository();
  const messageService = new MessageService({ messageRepository });
  return messageService;
}

const messageInstance = generateInstance();

export default messageInstance;
