import { useEffect, useState } from "react";
import axios from "axios";
import defaultAvatar from "./../../assets/pers2.png";
import { socket, connectSocket, disconnectSocket } from './socket';
import eventBus from './eventBus';

export default function ChatSidebar({
  activeChatId,
  setActiveChatId,
  setSelectedUser,
  setSelectedChat,
}) {
  const [chats, setChats] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  // Debug logging
  const debugLog = (message, data = {}) => {
    console.log(`[ChatSidebar] ${message}`, {
      ...data,
      connectionStatus,
      activeChatId,
      userId
    });
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        debugLog("Fetching chats...");
        const response = await axios.get(`${API}/private-chats`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });
        
        const chatsWithUnread = response.data.chats?.map(chat => ({
          ...chat,
          unread: chat.unread || false,
          last_message_time: chat.last_message_time || new Date().toISOString()
        })) || [];
        
        debugLog("Fetched chats", { count: chatsWithUnread.length });
        setChats(chatsWithUnread);
      } catch (error) {
        debugLog("Error fetching chats", { error: error.message });
        setError("Failed to load chats. Please refresh the page.");
      }
    };

    fetchChats();

    const handleIncomingMessage = (newMessage) => {
      try {
        debugLog("New message received", { message: newMessage });
        
        if (!newMessage?.chat_room_id || !newMessage?.sender_id) {
          debugLog("Invalid message format", { message: newMessage });
          return;
        }

        if (newMessage.sender_id === userId) {
          debugLog("Ignoring message from self");
          return;
        }

        setChats(prevChats => {
          const chatIndex = prevChats.findIndex(
            c => c.chat_room_id === newMessage.chat_room_id
          );

          const isActiveChat = activeChatId === newMessage.chat_room_id;
          debugLog("Processing message", { chatIndex, isActiveChat });

          if (chatIndex >= 0) {
            const updatedChats = [...prevChats];
            updatedChats[chatIndex] = {
              ...updatedChats[chatIndex],
              last_message: newMessage.message,
              last_message_time: newMessage.timestamp || new Date().toISOString(),
              unread: !isActiveChat,
            };

            if (!isActiveChat) {
              const [updatedChat] = updatedChats.splice(chatIndex, 1);
              return [updatedChat, ...updatedChats];
            }
            return updatedChats;
          } else {
            debugLog("Creating new chat entry");
            return [
              {
                chat_room_id: newMessage.chat_room_id,
                other_user_id: newMessage.sender_id,
                user_name: newMessage.senderName || "New User",
                user_profile_picture: newMessage.senderAvatar || "",
                last_message: newMessage.message,
                last_message_time: newMessage.timestamp || new Date().toISOString(),
                other_user_role: "user",
                unread: true,
              },
              ...prevChats,
            ];
          }
        });
      } catch (error) {
        debugLog("Error processing message", { error: error.message });
        setError("Error processing new message");
      }
    };

    // Socket event listeners
    const onConnect = () => {
      setConnectionStatus("connected");
      setError(null);
      debugLog("Socket connected");
    };

    const onDisconnect = () => {
      setConnectionStatus("disconnected");
      debugLog("Socket disconnected");
    };

    const onConnectError = (err) => {
      setConnectionStatus("error");
      setError("Connection error. Attempting to reconnect...");
      debugLog("Socket connection error", { error: err.message });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("private:receive_message", handleIncomingMessage);
    eventBus.on("new_message", handleIncomingMessage);

    connectSocket();

    return () => {
      debugLog("Cleaning up listeners");
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("private:receive_message", handleIncomingMessage);
      eventBus.off("new_message", handleIncomingMessage);
      disconnectSocket();
    };
  }, [activeChatId, userId, token, API]);

  const handleChatClick = (chat) => {
    debugLog("Chat clicked", { chatId: chat.chat_room_id });
    
    setActiveChatId(chat.chat_room_id);
    setSelectedUser({
      id: chat.other_user_id,
      name: chat.user_name,
      avatar: chat.user_profile_picture || defaultAvatar,
    });
    setSelectedChat(chat);
    
    setChats(prevChats => {
      const updatedChats = prevChats.map(c => 
        c.chat_room_id === chat.chat_room_id ? { ...c, unread: false } : c
      );
      
      const clickedIndex = updatedChats.findIndex(c => c.chat_room_id === chat.chat_room_id);
      if (clickedIndex > 0) {
        const [clickedChat] = updatedChats.splice(clickedIndex, 1);
        return [clickedChat, ...updatedChats];
      }
      return updatedChats;
    });
  };

  const handleRetryConnection = () => {
    debugLog("Manual connection retry");
    setError(null);
    connectSocket();
  };

  return (
    <div
      className="chat-sidebar p-3 border-end"
      style={{ width: "400px", height: "80vh", overflowY: "scroll" }}
    >
      <h5 className="mb-4 pb-3 border-bottom border-gray-200 me-0">All Chats</h5>
      
      {error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>{error}</span>
          <button 
            className="btn btn-sm btn-outline-light"
            onClick={handleRetryConnection}
          >
            Retry
          </button>
        </div>
      )}
{/* 
      {connectionStatus !== "connected" && (
        <div className={`alert ${
          connectionStatus === "error" ? "alert-warning" : "alert-info"
        }`}>
          {connectionStatus === "error" 
            ? "Connection problems. Trying to reconnect..." 
            : "Connecting to chat service..."}
        </div>
      )} */}

      {chats.length === 0 ? (
        <div className="text-center py-4 text-muted">No chats available</div>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.chat_room_id}
            className={`chat-item d-flex align-items-center mb-2 p-2 rounded ${
              activeChatId === chat.chat_room_id ? "bg-light" : ""
            } ${chat.unread ? "unread-chat" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleChatClick(chat)}
          >
            <div className="position-relative me-3">
              <img
                src={chat.user_profile_picture || defaultAvatar}
                alt="Avatar"
                className="rounded-circle"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              {chat.unread && (
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                  <span className="visually-hidden">New message</span>
                </span>
              )}
            </div>

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">
                  {chat.user_name}
                  {chat.unread && (
                    <span className="ms-2 badge bg-danger">New</span>
                  )}
                </span>
                <small className="text-muted">
                  {chat.last_message_time
                    ? new Date(chat.last_message_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </small>
              </div>
              <div className="text-truncate" style={{ maxWidth: "250px" }}>
                {chat.last_message || "No messages yet"}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}