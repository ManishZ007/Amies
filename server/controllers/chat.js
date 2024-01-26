import { Message } from "../model/messageModel.js";

export const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
  } catch (error) {
    console.log({ message: error.message });
  }
};

export const getAllMessage = async (req, res) => {
  try {
    const { from, to } = req.body;

    const message = await Message.find({
      users: { $all: [from, to] },
    }).sort({ updatedAt: 1 });

    const projectedMessage = message.map((msg) => {
      return {
        fromSelf: msg.sender.toString() == from,
        message: msg.message.text,
      };
    });

    res.json({ projectedMessage });
  } catch (error) {
    console.log({ message: error.message });
  }
};
