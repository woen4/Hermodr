import { Schema, model } from 'mongoose';

const MesssageSchema = new Schema({
  sender: {
    id: String,
    name: String,
  },
  receiver: {
    id: String,
    name: String,
  },
  timestamp: Date,
  content: String,
});

export default model('Message', MesssageSchema);
