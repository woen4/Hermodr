import { Schema, model } from 'mongoose';

const MesssageSchema = new Schema({
  roomId: String,
  author_id: String,
  author_name: String,
  timestamp: Date,
  content: String,
});

export default model('Message', MesssageSchema);
