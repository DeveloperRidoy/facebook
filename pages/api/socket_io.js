import { Server } from "socket.io";
import nextConnect from "next-connect";
import cors from "cors";
import ncConfig from "../../utils/server/ncConfig";
import handleFriendEvents from "../../server/io/handlers/handleFriendEvents";
import handleMessageEvents from "../../server/io/handlers/handleMessageEvents";

const handler = nextConnect(ncConfig);

handler.use(cors({ origin: "*" }));

handler.all((req, res) => {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket_io",
    addTrailingSlash: false,
    transports: ["xhr-polling"], 
    serveClient: true
  });

  // Event handler for client connections
  io.on("connect", (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);
    console.log(`client connected to room ${id}`);

    handleFriendEvents(socket, io);
    handleMessageEvents(socket, io);
    socket.on("disconnect", () => console.log("client discnnected"));
  });

  res.socket.server.io = io;
  res.end();
});

export default handler;

// disable body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
