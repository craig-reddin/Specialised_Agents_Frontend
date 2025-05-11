import { io, Socket } from "socket.io-client";

// Initialise socket connection
const SOCKET_URL = "http://127.0.0.1:5000";
let socket: Socket | null = null;

// Connect to the WebSocket server
export const connectSocket = (): Socket | undefined => {
  try {
    if (!socket) {
      socket = io(SOCKET_URL, {
        withCredentials: false,
        transports: ["websocket", "polling"],
        extraHeaders: {
          "Access-Control-Allow-Origin": "http://localhost:5173",
        },
      });

      // Setup default listeners
      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      socket.on("disconnect", () => {
        if (socket) {
          socket.close();
          console.log("Disconnected from WebSocket server");
        }
      });

      socket.on("error", (data) => {
      });
      return socket;
    }
  } catch {
    console.log("Hey Hey Hey");
  } finally {
    if (socket) {
      return socket;
    }
  }
};

// Disconnect from the WebSocket server
export const disconnectSocket = (): void => {
  if (socket && socket.connected) {
    console.log("disHeys");
    socket.disconnect();
  }
};

// Get the current socket instance
export const getSocket = (): Socket | null => {
  return socket;
};

// Send a message to the server
export const sendMessage = (message: string): void => {
  if (socket) {
    socket.emit("user_message", { message });
  } else {
    console.log("Socket not connected");
  }
};

export const sendPayload = (message: any): void => {
  if (socket) {
    socket.emit("user_message_team", message);
  } else {
    console.error("Socket not connected");
  }
};
