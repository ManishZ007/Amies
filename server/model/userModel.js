import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    lName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    profilePicturePath: {
      type: String,
      required: true,
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },

    occupation: String,
    location: String,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
