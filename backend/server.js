import express from "express";
import mongoose from 'mongoose';
import User from './models/user.js'; 
import UserInput from './models/inputs.js';
import connectMongoDB from './libs/mongodb.js';

const app = express();
const port = 5000; 

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
  console.log(req.body);  // Log the request body

  await connectDb();

  try {
    const newUser = await User.create({ username, passwordHash, email, roles });
    res.status(201).json({ message: 'User Created', user: newUser });
  } catch (error) {
    console.error(error);  // Log any errors
    res.status(400).json({ error: error.message });
  }
});


// GET /api/users - Get all users
app.get('/api/users', async (req, res) => {
  await connectDb();

  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/users/:id - Delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  await connectDb();

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ---------------------------------------------
// User Input routes
// ---------------------------------------------

// POST /api/inputs - Create a new input entry
app.post('/api/inputs', async (req, res) => {
  const {
    pregnancies,
    glucose,
    bloodPressure,
    skinThickness,
    insulin,
    bmi,
    diabetesPedigreeFunction,
    age,
  } = req.body;

  await connectDb();

  try {
    const newInput = await UserInput.create({
      pregnancies,
      glucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigreeFunction,
      age,
    });
    res.status(201).json({ message: 'Input Created', input: newInput });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
