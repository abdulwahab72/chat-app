import React, { useEffect, useState } from "react";
import {
  Home,
  Search,
  Bookmark,
  Share2,
  Settings,
  Video,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import ChatDetail from "./chatdetail";
import { Button } from "@/components/ui/button";
import AddContact from "./addcontact";
import { getContact } from "@/services/contact/contact";
const ChatSideBar = () => {
  const [open, setOpen] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const handleOpen = (selectId) => {
    if (selectId === selectedId) {
      // setSelectedId(selectId);
      setOpen((prev) => !prev);
    } else {
      setSelectedId(selectId);
      setOpen(true);
    }
  };
  const handleSearchShow = () => {
    setSearchShow(true);
  };
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getContact();
        setData(response?.data);
      } catch (e) {
        console.log("error", e);
      }
    };
    fetchData();
  }, []);
  //   console.log("data", data);
  return (
    <div className="flex">
      <div className="flex h-screen w-1/4 border-r-2 border-black text-white">
        {/* Sidebar */}
        {/* <div className="w-20 flex flex-col items-center py-6 space-y-6">
            <div className="text-purple-500 text-2xl font-bold">D</div>
            <div className="flex flex-col items-center space-y-6 text-gray-300">
              <Home className="hover:text-white" />
              <Search className="hover:text-white" />
              <Bookmark className="hover:text-white" />
              <Share2 className="hover:text-white" />
              <Settings className="hover:text-white" />
            </div>
            <div className="mt-auto mb-4">
              <img
                src="https://i.pravatar.cc/40?img=3"
                alt="User"
                className="rounded-full w-10 h-10"
              />
            </div>
          </div> */}

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Search */}

          {/* Message Section */}
          {/* <h2 className="text-lg text-black font-semibold mb-3">Message</h2> */}
          <div className=" flex justify-between mb-4 gap-4 ">
            <Button className="text-white" onClick={handleModal}>
              Add Chat
            </Button>
            <Search
              className={`${
                searchShow ? "hidden" : "block"
              } text-black w-8 h-8`}
              onClick={handleSearchShow}
            />
            {searchShow && (
              <input
                type="text"
                placeholder="Search........"
                className="w-full p-2 text-sm rounded-lg bg-[#2a2a2a] text-white border-none "
              />
            )}
          </div>
          {/* Tabs */}
          {/* <div className="flex space-x-4 mb-4">
            <button className=" px-4 py-1 rounded-full text-sm">
              All Chats
            </button>
            <button className="text-white px-4 py-1 rounded-full text-sm">
              Groups
            </button>
            <button className="text-white px-4 py-1 rounded-full text-sm">
              Contacts
            </button>
          </div> */}

          {/* Chat Cards */}
          <div className="space-y-3">
            {/* <Card className="bg-[#2d2d2d] p-4 flex justify-between items-center rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src="/figma.png"
                      alt="Figma"
                      className="w-10 h-10 rounded-lg"
                    />
                    <span className="absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Figma Teams</p>
                    <p className="text-green-400 text-sm">Typing.......</p>
                  </div>
                </div>
                <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                  2
                </span>
              </Card> */}

            {data.length > 0 &&
              data.map((item, i) => (
                <Card
                  key={i}
                  onClick={() => handleOpen(item?._id)}
                  className="bg-[#2d2d2d] p-4 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    {/* <img
                      src={`https://i.pravatar.cc/40?img=${i + 4}`}
                      alt={item.name}
                      className="w-10 h-10 rounded-full"
                    /> */}
                    <p className="rounded-full p-4 py-2 border-[1px] border-white">
                      {item.name[0]}
                    </p>
                    <div>
                      <p className="text-white font-semibold">{item.name}</p>
                      <p className="text-gray-400 text-sm">
                        {i === 0
                          ? "Good"
                          : i === 1
                          ? "Good Work"
                          : "I have done my work 👍"}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>

          {/* Calls Section */}
          {/* <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Calls</h2>
                <button className="bg-green-600 px-3 py-1 rounded-full text-sm">
                  + New Meet
                </button>
              </div>

              {[
                "Friends",
                "Darshan Zalavadiya",
                "School App Client",
                "Ui/UX Teams",
              ].map((name, i) => (
                <Card
                  key={i}
                  className="bg-[#2d2d2d] p-4 flex justify-between items-center rounded-xl mb-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={`https://i.pravatar.cc/40?img=${i + 10}`}
                        alt={name}
                        className="w-10 h-10 rounded-full"
                      />
                      {i === 0 && (
                        <span className="absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{name}</p>
                      <p className="text-green-400 text-sm">
                        {i === 0
                          ? "Joni is Talking...."
                          : i === 1
                          ? "30 min ago"
                          : i === 2
                          ? "Yesterday"
                          : "Last Week"}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-3 text-white">
                    <MessageCircle className="cursor-pointer" />
                    <Phone className="cursor-pointer" />
                  </div>
                </Card>
              ))}
            </div> */}
        </div>
      </div>
      {open && <ChatDetail data={selectedId} />}
      {isOpen && (
        <AddContact onClose={() => setIsOpen(false)} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default ChatSideBar;
