import Axios from "../axios";
import catchAsync from "../catchAsync";
import updatedNotifications from "../updatedNotifications";

const handleFriendEvent = (socket, state, setState, event) =>
  catchAsync(async () => {
    socket.on(event, async (data) => {
      const user = await (
        await Axios.get(
          `users/${
            event === "friend_event_received"
              ? data.recepientId
              : data.requesterId
          }`
        )
      ).data.data?.user;
      const notifications = updatedNotifications({
        notifications: state.notifications,
        recepient: user,
      });
      setState((state) => ({
        ...state,
        notifications,
        user,
      }));
    });
  }, setState);

export default handleFriendEvent;
