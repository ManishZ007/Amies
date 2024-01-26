import { Post } from "../model/postModel.js";
import { User } from "../model/userModel.js";

export const allPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    if (posts) {
      res.json({ status: true, posts });
    } else {
      res.json({
        status: false,
        message: "There is no any post",
      });
    }
  } catch (error) {
    console.log({ message: error.message });
  }
};

export const userPost = async (req, res) => {
  try {
    const { Id } = req.params;
    const userPosts = await Post.find({
      userId: { $all: Id },
    });

    !userPosts.length == 0
      ? res.json({ status: true, userPosts })
      : res.json({ status: false, message: "User not have any post" });
  } catch (error) {
    console.log({ message: error.message });
  }
};

export const getComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.comments.length === 0) {
      res.json({ status: false, message: "There no any comment" });
    } else {
      res.json({ status: true, comments: post.comments });
    }
  } catch (error) {
    console.log({ message: error.message });
  }
};

export const getLikePosts = async (req, res) => {
  try {
    //show only user like post
    const { userId } = req.params;
    const allPosts = await Post.find({});

    const posts = await Promise.all(allPosts.map((post) => post));

    // res.json(posts);

    const allLikePost = await Promise.all(
      posts.filter((post) => post.likes.includes(userId))
    );

    res.json({ status: true, allLikePost });
  } catch (error) {
    console.log({ message: error.message });
  }
};

export const getCommentPosts = async (req, res) => {
  try {
    // show only user give a comment on post
    const { userId } = req.params;
    const posts = await Post.find({});

    const allCommentPost = await Promise.all(
      posts.filter((post) => post.userCommentsId.includes(userId))
    );

    res.json({ status: true, allCommentPost });
  } catch (error) {
    console.log({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { Id } = req.params;
    const user = await User.findById(Id);
    const { description } = req.body;
    const postPath = req.file.filename;

    const newPost = await Post.create({
      userId: user._id,
      fName: user.fName,
      lName: user.lName,
      postPath,
      userProfilePicturePath: user.profilePicturePath,
      location: user.location,
      description,
    });
    if (newPost) {
      res.json({ status: true, newPost });
    } else {
      res.json({ status: false, message: "Post never cerated" });
    }
  } catch (error) {
    console.log({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post.likes.includes(req.params.Id)) {
      post.likes = post.likes.filter((id) => id !== req.params.Id);
    } else {
      post.likes.push(req.params.Id);
    }

    await post.save();
    res.json({ status: true, post });
  } catch (error) {
    console.log({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { comment } = req.body;
    const post = await Post.findById(req.params.postId);
    const user = await User.findById(req.params.Id);

    const formattingcomment = {
      fName: user.fName,
      lName: user.lName,
      profilePicture: user.profilePicturePath,
      comment,
    };

    post.comments.push(formattingcomment);
    post.userCommentsId.push(req.params.Id);
    post.save();

    res.json({ status: true, post });
  } catch (error) {
    console.log({ message: error.message });
  }
};
