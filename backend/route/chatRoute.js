import express from 'express';
import { Chat } from '../models/chat';

const router = express.Router();
const USER_ID = process.env.USER_ID;

// get all chats from a user
router.get('/', async (req, res) => {
  const chats = await Chat.find({ user: USER_ID });
  res.json(chats);
});

// get a chat by chat id and user id
router.get('/:id', async (req, res) => {
  const { id } = req.params; // chat id

  const chat = await Chat.findOne({ _id: id, user: USER_ID });
  if (!chat) {
    return res.status(404).json({ error: 'Chat not found' });
  }
  res.json(chat);
});

// create a new chat
// Create a new chat with ChatGPT response
router.post('/', async (req, res) => {
  const { message: userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  try {
    // Save user's message
    const userMsg = new Message({ text: userMessage, isUser: true });
    await userMsg.save();

    // Send message to ChatGPT
    const gptResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // or "gpt-4" if you have access
      messages: [{ role: 'user', content: userMessage }],
    });

    const chatGptMessageText = gptResponse.data.choices[0].message.content;

    // Save ChatGPT's message
    const gptMessage = new Message({ text: chatGptMessageText, isUser: false });
    await gptMessage.save();

    // Create a new chat document with both messages
    const chat = new Chat({
      message: [userMsg, gptMessage],
      user: USER_ID,
    });

    const savedChat = await chat.save();
    if (!savedChat) {
      return res.status(400).json({ error: 'Chat not saved' });
    }

    res.status(201).json(savedChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update a chat by chat id and user id
router.put('/:id', async (req, res) => {
  const { id } = req.params; // chat id
  const { message } = req.body;

  const chat = await Chat.findOne({ _id: id, user: USER_ID });
  if (!chat) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  chat.message = message;
  try {
    savingChat = await chat.save();

    if (!savingChat) {
      return res.status(400).json({ error: 'Chat not saved' });
    }

    return res.status(200).json(savingChat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get all messages from a chat by chat id and user id with pagination
router.get('/:id/messages', async (req, res) => {
  const { id } = req.params; // chat id
  const { page = 1, limit = 20 } = req.query;

  const chat = await Chat.findOne({ _id: id, user: USER_ID });
  if (!chat) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  const messages = chat.message.slice((page - 1) * limit, page * limit);
  res.json(messages);
});

export default router;
