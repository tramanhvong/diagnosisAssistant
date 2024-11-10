import mongoose, { Schema } from 'mongoose';
import Message from './message';

const chatSchema = new Schema({
  message: {
    type: [Message],
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

const Chat = mongoose.models.Chat || mongoose.model('chat', chatSchema);

export default Chat;
