import connectMongoDB from "@/libs/mongodb";
import UserInput from "@/models/userInput"; // Importing the UserInput model
import { NextResponse } from "next/server";

// Create a new input entry
export async function POST(request) {
  const {
    pregnancies,
    glucose,
    bloodPressure,
    skinThickness,
    insulin,
    bmi,
    diabetesPedigreeFunction,
    age,
  } = await request.json();
  await connectMongoDB();

  try {
    // Create a new input entry
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
    return NextResponse.json({ message: "Input Created", input: newInput }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Get all input entries
export async function GET() {
  await connectMongoDB();
  try {
    const inputs = await UserInput.find();
    return NextResponse.json({ inputs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete an input entry by ID
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();

  try {
    const deletedInput = await UserInput.findByIdAndDelete(id);
    if (!deletedInput) {
      return NextResponse.json({ message: "Input not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Input deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
