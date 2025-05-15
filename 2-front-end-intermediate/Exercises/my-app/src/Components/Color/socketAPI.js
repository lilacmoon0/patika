import io from "socket.io-client";
let socket;

export const init = () => {
  console.log("Connecting to server...");
  socket = io("http://localhost:3001/", {
    transports: ["websocket"],
  });

  socket.on("connect", () => console.log("Connected Succesfully."));
};
export const disconnect = () => {
  socket.disconnect();
};
export const sendToBackend = (color) => {
  socket.emit("newColor", color);
};

export const subscribe = (cb) => {
  socket.on("receive", (color) => {
    console.log("geldi", color);
    cb(color);
  });
};
