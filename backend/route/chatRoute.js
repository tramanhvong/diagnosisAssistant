import express from 'express';
import Chat from '../models/chat.js';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import 'dotenv/config';
import { PythonShell } from 'python-shell';

const router = express.Router();
const USER_ID = process.env.USER_ID;


const model = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-flash',
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
});

const features = [
  'Pregnancies',
  'Glucose',
  'Blood Pressure',
  'Skin Thickness',
  'Insulin',
  'BMI',
  'Diabetes Pedigree Function',
  'Age',
];

// create a new chat
router.post('/api/prompts', async (req, res) => {
  const { message } = req.body;
  const chat = new Chat({ message, user: USER_ID });
  const clientInput = [];

  try {
    features.map((feature) => {
      res.question(`Please enter ${feature}: `, (answer) => {
        clientInput.push(parseFloat(answer));
      });
    });
    const prediction = modelPredict(clientInput);
    let diagnosis = prediction == 1 ? 'diabetic' : 'not diabetic';

    // prepare response
    const diagnosis_output = `Here is your alledged diagnosis: ${diagnosis}`;
    if (prediction == 1) {
      const ai_response = model.generate_content(
        'Please give advice on the next step if their diagnosis is potentially diabetic.'
      );
    }

    const response = diagnosis_output + '\n' + ai_response;
    if (!response) {
      return res.status(400).json({ error: 'Response error' });
    }

    return res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function modelPredict(values) {
  return new Promise((resolve, reject) => {
    const options = {
      mode: 'text',
      pythonOptions: ['-u'],
      args: [JSON.stringify(values)],
    };

    PythonShell.run('diabetes_model.py', options, (err, results) => {
      if (err) {
        return reject(err);
      }

      resolve(parseInt(results[0]));
    });
  });
}

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

export default router;