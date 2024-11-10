import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});
const Message =
  mongoose.models.Message || mongoose.model('message', messageSchema);

export default Message;
