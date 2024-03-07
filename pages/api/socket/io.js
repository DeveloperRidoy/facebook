import { Server } from "socket.io";
import cors from "cors";
import nextConnect from "next-connect";
import ncConfig from "../../../utils/server/ncConfig";

const handler = nextConnect(ncConfig);

// Enable CORS
handler.use(cors());

handler.all((req, res) => {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);

  // Event handler for client connections
  io.on("connection", (socket) => {
    const clientId = socket.id;
    console.log("A client connected");
    console.log(`A client connected. ID: ${clientId}`);
    io.emit("client-new", clientId);

    // Event handler for receiving messages from the client
    socket.on("message", (data) => {
      console.log("Received message:", data);
    });

    // Event handler for client disconnections
    socket.on("disconnect", () => {
      console.log("A client disconnected.");
    });
  });

  res.socket.server.io = io;
  res.end();
});

export default handler;
