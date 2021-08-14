const handleFriendEvents = (socket, io) => {
    const handleEvent = (receivedEvent, responseEvent) => {
         socket.on(receivedEvent, (data) =>
           socket.broadcast
             .to(data.recepient._id)
             .emit(responseEvent, data)
         );
    }
    
    handleEvent("friend_request_sent", "friend_request_received");
    
    handleEvent(
      "friend_request_cancelled",
      "friend_request_cancellation_received"
    );
    
    handleEvent(
      "friend_request_accepted",
      "friend_request_acceptation_received"
    );
    
    handleEvent(
      "friend_request_declined",
      "friend_request_declination_received"
    );
    
    handleEvent("friend_unfriend", "friend_unfriend_received");

}

module.exports = handleFriendEvents;