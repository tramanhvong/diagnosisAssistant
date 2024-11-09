import mongoose, { Schema } from "mongoose";

const userInputSchema = new Schema(
  {
    pregnancies: {
      type: Number,
      required: true,
      min: 0,
      integer: true, // Ensuring no fractional values
    },
    glucose: {
      type: Number,
      required: true,
      min: 0,
      integer: true, // Ensuring no fractional values
    },
    bloodPressure: {
      type: Number,
      required: true,
      min: 0,
      integer: true,
    },
    skinThickness: {
      type: Number,
      required: true,
      min: 0,
      integer: true,
    },
    insulin: {
      type: Number,
      required: true,
      min: 0,
      integer: true,
    },
    bmi: {
      type: Number,
      required: true,
      min: 0,
    },
    diabetesPedigreeFunction: {
      type: Number,
      required: true,
      min: 0,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      integer: true,
    },
  },
  {
    timestamps: true, 
  }
);

const UserInput = mongoose.models.UserInput || mongoose.model("userInput", userInputSchema);

export default UserInput;
