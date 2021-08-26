import catchAsync from "../catchAsync";
import updatedNotifications from "../updatedNotifications";

const handleFriendEvent = (socket, state, setState, event) => catchAsync(async () => {
  socket.on(event, (data) => {
    const notifications = updatedNotifications({
      notifications: state.notifications,
      recepient:
        event === "friend_event_received" ? data.recepient : event === 'reverse_friend_event_received' && data.requester,
    });
    setState((state) => ({
      ...state,
      notifications,
      user: event === "friend_event_received" ? data.recepient : event === 'reverse_friend_event_received' && data.requester,
    }));
  });
}, setState)


export default handleFriendEvent;