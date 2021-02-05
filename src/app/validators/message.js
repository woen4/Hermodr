import Validator from 'fastest-validator';

const validator = new Validator();

const messageValidator = {
  room_id: { type: 'string', min: 36, max: 36 },
  author_id: { type: 'string', min: 36, max: 36 },
  author_name: { type: 'string', min: 4, max: 36 },
  content: { type: 'string', min: 1, max: 255 },
};

const checker = validator.compile(messageValidator);

export default checker;
