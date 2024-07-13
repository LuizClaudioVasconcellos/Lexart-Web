import io from "socket.io-client";

const socket = io("http://localhost:3334");

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});

export const sendMessageToWebSocketClients = (message) => {
  socket.emit("progress", message);
};
