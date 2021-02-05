import { Schema, model } from 'mongoose';

const RoomSchema = new Schema(
  {
    id: String,
    users: [
      {
        name: String,
        id: String,
        isAdmin: { type: Boolean, default: false },
      },
    ],
    connectedUsers: [String],
  },
  { timestamps: true }
);

export default model('Room', RoomSchema);
