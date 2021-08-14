import { PENDING } from "../../global/variables";

const updatedNotifications = ({notifications, recepient}) => {
    const newFriendRequests = recepient?.friends?.filter(
      (friend) =>
        friend.requester._id === recepient._id &&
        friend.status === PENDING &&
        !friend.seen
    );
    notifications.newFriendRequests = newFriendRequests;
     
    let totalNotifications = 0;
     for (let key in notifications) {
       if (Array.isArray(notifications[key])) {
         notifications[key].forEach((_) => (totalNotifications += 1));
       }
     }

    notifications.totalNotifications = totalNotifications;
    
    return notifications;
}

export default updatedNotifications