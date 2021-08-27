const handleMessageEvents = (socket, io) => {

  socket.on('message_sent', data => {
        data.participants?.forEach((user) =>
          socket.broadcast.to(user).emit("message_received", data)
      );
    })


}



module.exports = handleMessageEvents;