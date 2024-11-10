import express from 'express';
import { Chat } from '../models/chat';

const router = express.Router();

router.get('/', async (req, res) => {
  const chats = await Chat.find();
  res.json(chats);
});
