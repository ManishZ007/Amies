import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  postPath: String,
  userProfilePicturePath: String,
  location: String,
  description: String,
  likes: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  userCommentsId: {
    type: Array,
    default: [],
  },
});

export const Post = mongoose.model("Post", postSchema);
