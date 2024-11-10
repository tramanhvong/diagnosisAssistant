import express from "express";
// import mongoose from 'mongoose';
import User from './models/user.js'; 
import UserInput from './models/inputs.js';
import connectMongoDB from './libs/mongodb.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const port = 5000; 

dotenv.config(); // Load environment variables from .env file

const allowedOrigin = process.env.CLIENT_URL;
console.log("allowurl"+allowedOrigin);

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend Server is running!');
});


// Connect to MongoDB 
const connectDb = async () => {
  try {
    await connectMongoDB();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// ---------------------------------------------
// User routes
// ---------------------------------------------

// POST /api/users - Create a new user
app.post('/api/users', async (req, res) => {
  const { username, passwordHash, email, roles } = req.body;

  try {
    await connectDb();

    // Attempt to create the new user
    const newUser = await User.create({ username, passwordHash, email, roles });
    res.status(201).json({ message: 'User Created', user: newUser });
    console.log('User created successfully');
  } catch (error) {
    // Handle MongoDB duplicate key error (E11000)
    if (error.code === 11000) {
      res.status(409).json({ error: 'This email is already registered. Please use a different email.' });
    } else {
      console.error('Error during registration:', error); // Log the error for debugging
      res.status(400).json({ error: error.message || 'Registration failed.' });
    }
  }
});



// GET /api/inputs - Get all input entries
app.get('/api/inputs', async (req, res) => {
  await connectDb();

  try {
    const inputs = await UserInput.find();
    res.json({ inputs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/inputs/:id - Delete an input entry by ID
app.delete('/api/inputs/:id', async (req, res) => {
  const { id } = req.params;

  await connectDb();

  try {
    const deletedInput = await UserInput.findByIdAndDelete(id);
    if (!deletedInput) {
      return res.status(404).json({ message: 'Input not found' });
    }
    res.status(200).json({ message: 'Input deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
