import MessageGroupService from '../services/messageGroupService';
import MessageGroupRepository from '../repositories/messageGroupRepository';

function generateInstance() {
  const messageGroupRepository = new MessageGroupRepository();
  const messageGroupService = new MessageGroupService({
    messageGroupRepository,
  });
  return messageGroupService;
}

const messageGroupInstance = generateInstance();

export default messageGroupInstance;
