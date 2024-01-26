import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { Server } from "socket.io";
import http from "http";
import { fileURLToPath } from "url";
import authRoutes from "./route/auth.js";
import userRoutes from "./route/user.js";
import postRoutes from "./route/post.js";
import chatRoutes from "./route/chat.js";
import { Register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import { registrationValidation } from "./middleware/authValidation.js";
import { tokenValidation } from "./middleware/tokenValidation.js";
// import { User } from "./model/userModel.js";
// import { Post } from "./model/postModel.js";
import { users, posts } from "./data/index.js";

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// FILE CONTAIN ROUTE

app.post(
  "/auth/register",
  registrationValidation,
  upload.single("profilePicture"),
  Register
);

app.post(
  "/post/:Id/createPost",
  // tokenValidation,
  upload.single("postPath"),
  createPost
);

// SINGLE FUNCTION ROUTE

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/chat", chatRoutes);

// SOCKET
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

global.onlineUser = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userID) => {
    onlineUser.set(userID, socket.id);
  });

  socket.on("send-msg", (paylod) => {
    const sendUserSocket = onlineUser.get(paylod.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", paylod.message);
    }
  });
});

// PORT
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
    })
    .then(async () => {
      console.log(`Server start on port ${PORT}`);
      /* ADD DATA ONE TIME */
      // await User.insertMany(users);
      // await Post.insertMany(posts);
    })
    .catch((error) => {
      console.log({ message: error.message });
    });
});
