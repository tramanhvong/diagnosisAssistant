import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user"; // Updated to import the User model
import { NextResponse } from "next/server";

// Create a new user
export async function POST(request) {
  const { username, passwordHash, email, roles } = await request.json();
  await connectMongoDB();

  try {
    // Create a new user with provided data (assuming password is already hashed)
    const newUser = await User.create({ username, passwordHash, email, roles });
    return NextResponse.json({ message: "User Created", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Get all users
export async function GET() {
  await connectMongoDB();
  try {
    const users = await User.find();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a user by ID
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
