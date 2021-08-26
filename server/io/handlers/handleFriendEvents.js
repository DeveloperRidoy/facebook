const handleFriendEvents = (socket, io) => {
  socket.on("friend_event_sent", (data) => {
    console.log(data);
    socket.broadcast.to(data.recepient._id).emit("friend_event_received", data);
  });
  socket.on("reverse_friend_event_sent", (data) => {
       console.log(data);
       socket.broadcast
         .to(data.requester._id)
         .emit("reverse_friend_event_received", data);
     });
}


module.exports = handleFriendEvents;