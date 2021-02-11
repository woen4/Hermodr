import { Schema, model } from 'mongoose';

const MesssageSchema = new Schema(
  {
    id: String,
    room_id: String,
    user_id: String,
    user_name: String,
    timestamp: Date,
    content: String,
  },
  { validateBeforeSave: false }
);

export default model('Message', MesssageSchema);
