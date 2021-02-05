import { Schema, model } from 'mongoose';

const MesssageSchema = new Schema(
  {
    room_id: String,
    author_id: String,
    author_name: String,
    timestamp: Date,
    content: String,
  },
  { validateBeforeSave: false }
);

export default model('Message', MesssageSchema);
