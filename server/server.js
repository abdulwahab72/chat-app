const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { createServer } = require("http");
const { Server } = require("socket.io");
const uuid = require("uuid");

const authRouter = require("./routes/authRoutes");
const contactRouter = require("./routes/contactRoutes");
const chatRouter = require("./routes/chatRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo error", err));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.engine.generateId = (req) => {
  const id = uuid.v4(); // must be unique across all Socket.IO servers
  console.log("first", id);
  return id;
};
io.engine.on("headers", (headers, req) => {
  headers["test"] = "123";
  headers["set-cookie"] = "mycookie=456";
});
// io.engine.on("headers", (headers, req) => {
//   headers["test"] = "789";
// });
io.engine.on("connection_error", (err) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});
// io.use((socket, next) => {
//   const error = new Error("Manually blocked connection");
//   error.data = { content: "You are not allowed to connect" };
//   next(error);
// });

// console.log("Socket ID:", socket.id);

io.on("connection", (socket) => {
  //Count the size
  const count = io.engine.clientsCount;
  // may or may not be similar to the count of Socket instances in the main namespace, depending on your usage
  const count2 = io.of("/").sockets.size;
  console.log("Connected clients count (engine):", count);
  console.log("Connected clients count (namespace):", count2);
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);
  });
  // console.log("Socket UUID:", io.engine.generateId(socket.request));

  console.log(`New client connected: ${socket.id}`);
  socket.on("SendMessage", ({ text, room }) => {
    const message = { text, sender: socket.id };
    console.log(`Message in ${room} from ${socket.id}:`, text);
    // io.to("room1").emit("receiveMessage", `[room1] ${message}`);
    io.emit("receiveMessage", message);
  });

  // make all Socket instances join the "room1" room
  io.socketsJoin("room1");
  console.log(`${socket.id} joined room1`);

  // make all Socket instances in the "room1" room join the "room2" and "room3" rooms
  io.in("room1").socketsJoin(["room2", "room3"]);
  console.log(`All in room1 joined room2 and room3`);

  // make all Socket instances in the "room1" room of the "admin" namespace join the "room2" room
  io.of("/admin").in("room1").socketsJoin("room2");

  // this also works with a single socket ID
  io.in(socket.id).socketsJoin("room1");
  console.log("All rooms of this socket:", socket.rooms);

  socket.on("disconnect", () => {
    //Count the size
    // const count = io.engine.clientsCount;
    // // may or may not be similar to the count of Socket instances in the main namespace, depending on your usage
    // const count2 = io.of("/").sockets.size;
    // console.log("Connected clients count (engine):", count);
    // console.log("Connected clients count (namespace):", count2);
    console.log(`client disconnected ${socket.id}`);
  });
});
// app.get("/test", (req, res) => {
//   res.setHeader("test", "123");
//   res.setHeader("Set-Cookie", "mycookie=456");
//   res.send("Headers sent");
// });
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);
app.use("/api/chat", chatRouter);
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
