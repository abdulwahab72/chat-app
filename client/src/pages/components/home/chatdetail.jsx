import React, { useEffect, useState } from "react";
import {
  Video,
  Phone,
  MessageSquare,
  Smile,
  Paperclip,
  Camera,
  Mic,
} from "lucide-react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
const socket = io("http://localhost:5000");
const ChatDetail = () => {
  const [room, setRoom] = useState("room1");
  const [socketId, setSocketId] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  useEffect(() => {
    socket.emit("joinRoom", room);
    socket.on("connect", () => {
      setSocketId(socket.id);
    });
    socket.on("receiveMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("receiveMessage");
      socket.off("connect");
    };
  }, [room]);
  const sendMessage = () => {
    const messageData = {
      text: message,
      sender: socket.id,
    };
    socket.emit("SendMessage", { room, text: messageData });
    // setChat((prev) => [...prev, messageData]);
    setMessage("");
  };
  return (
    <div className="h-screen w-full bg-[#111b21] text-white flex flex-col">
      {/* Header */}
      <div className="bg-[#202c33] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://i.pravatar.cc/40?img=3"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold">Darshan Zalavadiya</h2>
            <p className="text-green-400 text-sm">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Video className="cursor-pointer" />
          <Phone className="cursor-pointer" />
          <MessageSquare className="cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-center bg-cover"
        style={{ backgroundImage: 'url("/bg-pattern.png")' }}
      >
        <div className="text-center text-gray-400 text-sm">Today, 9:30 am</div>

        {/* Left messages */}
        <div className="flex items-end space-x-2">
          <img
            src="https://i.pravatar.cc/40?img=3"
            alt="Sender"
            className="w-8 h-8 rounded-full"
          />
          {/* <div className="space-y-2">
            <div className="bg-[#2a3942] px-4 py-2 rounded-xl max-w-xs">
              Hello
            </div>
            <div className="bg-[#2a3942] px-4 py-2 rounded-xl max-w-xs">
              I am good
            </div>
            <div className="bg-[#2a3942] px-4 py-2 rounded-xl max-w-xs">
              What about You
            </div>
            <div className="bg-[#2a3942] px-4 py-2 rounded-xl max-w-xs">
              Good
            </div>
          </div> */}
        </div>

        {/* Right messages */}
        <div className="flex justify-end">
          {/* <div className="space-y-2 text-right">
            <div className="bg-[#2a3942] px-4 py-2 rounded-xl inline-block">
              Hello, Darshan
            </div>
            <div className="bg-[#2a3942] px-4 py-2 rounded-xl inline-block">
              How are you
            </div>
            <div className="bg-[#2a3942] px-4 py-2 rounded-xl inline-block">
              Same for this side
            </div>
          </div> */}
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === socketId ? "justify-end" : "justify-start"
              }`}
            >
              <p className="bg-[#2a3942] px-4 py-2 rounded-xl max-w-xs">
                {msg?.text?.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <div className="bg-[#202c33] px-4 py-2 flex items-center space-x-3">
        <Smile className="text-gray-400 cursor-pointer" />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message........"
          className="flex-1 px-4 py-2 bg-[#2a3942] rounded-full text-white border-none outline-none"
        />
        <Paperclip className="text-gray-400 cursor-pointer" />
        <Camera className="text-gray-400 cursor-pointer" />
        <Mic className="text-gray-400 cursor-pointer" />
        <Button className="text-white" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatDetail;
