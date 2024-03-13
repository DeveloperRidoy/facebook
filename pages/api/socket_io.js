import { Server } from "socket.io";
import nextConnect from "next-connect";
import cors from "cors";
import ncConfig from "../../utils/server/ncConfig";
import handleFriendEvents from "../../server/io/handlers/handleFriendEvents";
import handleMessageEvents from "../../server/io/handlers/handleMessageEvents";

const handler = nextConnect(ncConfig);

handler.use(cors({ origin: "*" }));

const userSocketMap = {};

handler.all((req, res) => {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket_io",
    addTrailingSlash: false,
    transports: [
      "polling",
      "websocket",
      "flashsocket",
      "htmlfile",
      "xhr-polling",
      "jsonp-polling",
    ],
    serveClient: true,
  });

  // Event handler for client connections
  io.on("connect", (socket) => {
    const id = socket.handshake.query.id;
    userSocketMap[id] = socket.id;
    // socket.join(id);
    // console.log(`client connected to room ${id}`);
    console.log(`client connect to socket id ${socket.id}`)
    console.log(userSocketMap);

    handleFriendEvents(socket, userSocketMap);
    handleMessageEvents(socket, userSocketMap);
    socket.on("disconnect", () => {
      console.log(`client discnnected for socket id ${socket.id}`);
      console.log(userSocketMap)
    });
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
