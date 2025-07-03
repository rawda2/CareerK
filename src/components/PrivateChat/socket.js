import { io } from "socket.io-client";

const API = import.meta.env.VITE_API_URL;

// Create a more robust socket instance
export const socket = io(API, {
  autoConnect: false,
  auth: (cb) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      cb({ error: "Authentication required" });
    } else {
      cb({ token });
    }
  },
  reconnection: true,
  reconnectionAttempts: Infinity, // Keep trying to reconnect
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  transports: ["websocket"], // Force WebSocket transport
});

// Connection management with status tracking
let connectionAttempts = 0;
const MAX_CONNECTION_ATTEMPTS = 5;

export const connectSocket = () => {
  if (!socket.connected && connectionAttempts < MAX_CONNECTION_ATTEMPTS) {
    console.log(`Socket connection attempt ${connectionAttempts + 1}`);
    connectionAttempts++;
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    connectionAttempts = 0; // Reset attempts on manual disconnect
  }
};

// Add debug listeners
socket.on("connect", () => {
  console.log("Socket connected");
  connectionAttempts = 0; // Reset on successful connection
});

socket.on("disconnect", (reason) => {
  console.log(`Socket disconnected: ${reason}`);
  if (reason === "io server disconnect") {
    // The server forcefully disconnected the socket
    socket.connect(); // Try to reconnect immediately
  }
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
  // Try reconnecting after a delay
  setTimeout(() => connectSocket(), 5000);
});

// Utility function to check connection status
export const getSocketStatus = () => {
  return {
    connected: socket.connected,
    id: socket.id,
    auth: socket.auth,
  };
};