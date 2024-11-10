// models/chat.js
import mongoose, { Schema } from 'mongoose';

const chatSchema = new Schema({
  message: {
    type: [Schema.Types.ObjectId],
    ref: 'Message',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);
export default Chat;
