import Link from "next/link";
import { useGlobalContext } from "../../../context/GlobalContext";
import Axios from "../../../utils/client/axios";
import catchAsync from "../../../utils/client/functions/catchAsync";
import NextImage from "../../NextImage";

const NotificationsBox = () => {
  const [state, setState] = useGlobalContext();
  const { totalNotifications, newFriendRequests } = state.notifications;
  return (
    <div>
      {totalNotifications === 0 ? (
        <p> no notifications</p>
      ) : (
        <div>
          {newFriendRequests.length > 0 && (
            <FriendRequests requests={newFriendRequests} setState={setState} />
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsBox;

const FriendRequests = ({ requests, setState }) => {
  const removeNotification = (request) =>
    catchAsync(async () => {
      const res = await Axios.post(`friends/see/${request.recepient._id}`);

      setState((state) => ({
        ...state,
        user:
          res.data.data?.recepient._id === state.user?._id
            ? res.data.data?.recepient
            : state.user,
        notifications: {
          ...state.notifications,
          newFriendRequests: state.notifications.newFriendRequests.filter(
            (req) => req._id !== request._id
          ),
          totalNotifications: state.notifications.totalNotifications - 1,
        },
      }));
    }, setState);
  return (
    <div className="flex flex-col gap-2 p-1">
      {requests.map((request) => (
        <Link
          legacyBehavior
          href={`/users/${request.recepient.slug}`}
          key={request._id}
        >
          <a
            href={`/users/${request.recepient.slug}`}
            className="flex gap-1 items-center rounded transition hover:bg-dark-300 py-1 px-2"
            onClick={() => removeNotification(request)}
          >
            <NextImage
              photo={request.recepient?.photo}
              className=" h-9 w-9 rounded-full "
            />
            <p>{request.recepient.firstName} sent you a friend request</p>
          </a>
        </Link>
      ))}
    </div>
  );
};
