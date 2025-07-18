const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { createServer } = require("http");
const { Server } = require("socket.io");

const authRouter = require("./routes/authRoutes");
const contactRouter = require("./routes/contactRoutes");

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
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);
  socket.on("SendMessage", (message) => {
    console.log("received", message);
    io.emit("receiveMessage", message);
  });
  socket.on("disconnect", () => {
    console.log(`client disconnected ${socket.id}`);
  });
});

app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
