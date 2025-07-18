import React from "react";
import HeaderComponent from "../components/Header/header";
import { Button } from "@/components/ui/button";

import ChatSideBar from "../components/home/chatsidebar";
const HomePage = () => {
  return (
    <div>
      <HeaderComponent />
      <ChatSideBar />
    </div>
  );
};

export default HomePage;
