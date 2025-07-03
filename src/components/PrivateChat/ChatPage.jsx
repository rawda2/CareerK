import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

export default function ChatPage() {
  const [activeChatId, setActiveChatId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="chat-page d-flex" style={{ height: "100vh" }}>
      <ChatSidebar
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        setSelectedUser={setSelectedUser}
        setSelectedChat={setSelectedChat}
      />
      <ChatWindow chat={selectedChat} />
    </div>
  );
}