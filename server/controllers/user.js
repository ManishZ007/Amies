import { User } from "../model/userModel.js";

// READ

export const getAllUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.find({ _id: { $ne: id } });

    const formattingUser = users.map(
      ({ _id, profilePicturePath, fName, lName, occupation }) => {
        return { _id, profilePicturePath, fName, lName, occupation };
      }
    );

    res.json({ status: true, formattingUser });
  } catch (error) {
    console.log({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });

    if (!user) {
      res.json({ status: false, message: "user not found" });
    } else {
      res.json({ status: true, currentUser: user });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });

    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );

    const formatingFollowers = followers.map(
      ({ _id, profilePicturePath, fName, lName, occupation }) => {
        return { _id, profilePicturePath, fName, lName, occupation };
      }
    );

    res.json({ status: true, formatingFollowers });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });

    const following = await Promise.all(
      user.following.map((id) => User.findById(id))
    );

    const formatingFollowing = following.map(
      ({ _id, profilePicturePath, fName, lName, occupation }) => {
        return { _id, profilePicturePath, fName, lName, occupation };
      }
    );

    res.json({ status: true, formatingFollowing });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// UPDATE
// work on all update api

export const FollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const requestedUser = await User.findById(req.params.reqId);

    if (!user.following.includes(req.params.reqId)) {
      await user.updateOne({ $push: { following: req.params.reqId } });
      await requestedUser.updateOne({ $push: { followers: req.params.id } });
    } else {
      res.json({ message: "you allready follow this user", requestedUser });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const unFollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const requestedUser = await User.findById(req.params.reqId);

    if (user.following.includes(req.body.userId)) {
      user.following = user.following.filter((id) => id !== req.params.reqId);
      requestedUser.followers = requestedUser.followers.filter(
        (id) => id !== req.params.id
      );
      await user.save();
      await requestedUser.save();
      res.json({ requestedUser });
    } else {
      res.json({ message: "user is not in a following list" });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const removeFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const requestedUser = await User.findById(req.params.reqId);

    if (user.followers.includes(req.params.reqId)) {
      user.followers = user.followers.filter((id) => id !== req.params.reqId);
      requestedUser.following = requestedUser.following.filter(
        (id) => id !== req.params.id
      );

      res.json({ message: "user remove from followers list" });
    } else {
      res.json({ message: "user allready not in a followers list" });
    }

    await user.save();
    await requestedUser.save();
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
