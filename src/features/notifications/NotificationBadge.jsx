import { useSelector } from "react-redux";
import { Bell } from "lucide-react";

const NotificationBadge = () => {
  const unreadCount = useSelector(
    (state) => state.notifications.unreadCount
  );

  return (
    <div className="relative cursor-pointer">
      <Bell className="w-6 h-6 text-white" />

      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBadge;