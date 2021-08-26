const handleMessageEvents = (socket, io) => {

    socket.on('message_sent', message => {
        message.participants?.forEach((user) =>
          socket.broadcast.to(user._id).emit("message_received", message)
      );
    })


}



module.exports = handleMessageEvents;