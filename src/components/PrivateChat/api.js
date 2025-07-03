import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "ngrok-skip-browser-warning": "true"
});

export default {
  // Get all chats for logged-in user
  async getAllChats() {
    try {
      const response = await axios.get(`${API}/private-chats`, {
        headers: getHeaders()
      });
      return response.data.chats || [];
    } catch (error) {
      console.error("Error fetching chats:", error);
      throw error;
    }
  },

  // Start a new chat
  async startChat(targetUserId) {
    try {
      const response = await axios.post(
        `${API}/private-chats/start`,
        { targetUser: { user_id: targetUserId } },
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error starting chat:", error);
      throw error;
    }
  },

  // Get messages for a specific chat
  async getChatMessages(chatRoomId) {
    try {
      const response = await axios.get(`${API}/private-chats/${chatRoomId}`, {
        headers: getHeaders()
      });
      return response.data.messages || [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  // Send a message
  async sendMessage(chatRoomId, message, file = null) {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("message", message);
        formData.append("chat-file", file);
        
        const response = await axios.post(
          `${API}/private-chats/${chatRoomId}`,
          formData,
          {
            headers: {
              ...getHeaders(),
              "Content-Type": "multipart/form-data"
            }
          }
        );
        return response.data;
      } else {
        const response = await axios.post(
          `${API}/private-chats/${chatRoomId}`,
          { message },
          { headers: getHeaders() }
        );
        return response.data;
      }
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
};