const handleMessageEvents = (socket, userSocketMap) => {
  socket.on("message_sent", (data) => {
    // send data to recepienta
    data.participants?.forEach((user) => {
      // check if intended client is connected
      if (!user in userSocketMap) return;
      socket.to(userSocketMap[user]).emit("message_received", data);
    });
  });
};

module.exports = handleMessageEvents;
