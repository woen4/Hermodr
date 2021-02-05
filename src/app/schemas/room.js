import { Schema, model } from 'mongoose';

const RoomSchema = new Schema(
  {
    id: String,
    users: [
      {
        name: String,
        id: String,
      },
    ],
    connectedUsers: [String],
  },
  { timestamps: true }
);

export default model('Room', RoomSchema);
