import express from 'express';
import { Chat } from '../models/chat';

const router = express.Router();
const USER_ID = process.env.USER_ID;

// get all chats
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
router.post('/', async (req, res) => {
  const { message } = req.body;
  const chat = new Chat({ message, user: USER_ID });
  try {
    // call chatbot api to get response
    // const response = await chatbotAPI(message);
    // chat.message.push(response);
    // await
    
    savedChat = await chat.save();

    if (!savedChat) {
      return res.status(400).json({ error: 'Chat not saved' });
    }
    return res.status(201).json(savedChat);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  const { page = 1, limit = 10 } = req.query;

  const chat = await Chat.findOne({ _id: id, user: USER_ID });
  if (!chat) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  const messages = chat.message.slice((page - 1) * limit, page * limit);
  res.json(messages);
});
