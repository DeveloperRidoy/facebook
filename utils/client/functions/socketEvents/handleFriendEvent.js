import updatedNotifications from "../updatedNotifications";

const handleFriendEvent = (socket, state, setState, event) => {
  socket.on(event, (data) => {
    const notifications = updatedNotifications({
      notifications: state.notifications,
      recepient:
        event === "friend_event_received" ? data.recepient : data.requester,
    });
    setState((state) => ({
      ...state,
      notifications,
      user: event === "friend_event_received" ? data.recepient : data.requester,
    }));
  });
};


export default handleFriendEvent;