import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.60CzHo23beRRZ374Vr6iuwHaHa?w=190&h=190&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
