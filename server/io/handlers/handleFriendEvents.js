const handleFriendEvents = (socket, io) => {
  socket.on("friend_event_sent", (data) => {
    socket.broadcast.to(data.recepientId).emit("friend_event_received", data);
  });
  socket.on("reverse_friend_event_sent", (data) => {
       socket.broadcast
         .to(data.requesterId)
         .emit("reverse_friend_event_received", data);
     });
}


module.exports = handleFriendEvents;