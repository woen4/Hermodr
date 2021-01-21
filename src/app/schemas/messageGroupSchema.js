import { Schema, model } from 'mongoose';

const MesssageGroupSchema = new Schema({
  roomId: String,
  sender: {
    id: String,
    name: String,
  },
  timestamp: Date,
  content: String,
});

export default model('MessageGroup', MesssageGroupSchema);
