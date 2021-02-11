import Validator from 'fastest-validator';

const validator = new Validator();

const messageValidator = {
  room_id: { type: 'uuid', version: 5 },
  user_id: { type: 'uuid', version: 4 },
  user_name: { type: 'string', min: 4, max: 50 },
  content: { type: 'string', min: 1, max: 255 },
};

const checker = validator.compile(messageValidator);

export default checker;
