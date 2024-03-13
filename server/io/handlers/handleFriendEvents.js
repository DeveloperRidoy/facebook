const handleFriendEvents = (socket, userSocketMap) => {
  socket.on("friend_event_sent", (data) => {
    // check if intended client is connected
    if (!data?.recepientId in userSocketMap) return;

    // send data to recepient
    socket
      .to(userSocketMap[data.recepientId])
      .emit("friend_event_received", data);
  });

  socket.on("reverse_friend_event_sent", (data) => {
    // check if intended client is connected
    if (!data?.requesterId in userSocketMap) return;
    socket
      .to(userSocketMap[data.requesterId])
      .emit("reverse_friend_event_received", data);
  });
};

module.exports = handleFriendEvents;
