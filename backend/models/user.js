import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    roles: {
      type: [String],
      default: ["user"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // This will automatically create 'createdAt' and 'updatedAt' fields
  }
);

const User = mongoose.models.User || mongoose.model("user", userSchema);

export default User;
