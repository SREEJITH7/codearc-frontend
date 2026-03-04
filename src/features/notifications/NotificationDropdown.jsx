import { useSelector, useDispatch } from "react-redux";
import { markAllReadOnServer, fetchNotifications } from "./notificationSlice";
import { useState, useEffect } from "react";



const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { notifications, unreadCount } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleToggle = () => {
    if (!open && unreadCount > 0) {
      dispatch(markAllReadOnServer());
    }
    setOpen(!open);
  };

  return (
    <div className="relative">
      
      <button
        onClick={handleToggle}
        className="relative p-2 rounded-full hover:bg-slate-800 transition-colors"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-slate-900">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 max-h-[32rem] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Notifications</h3>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 text-sm italic">
                  No new notifications
                </p>
              </div>
            ) : (
              notifications.map((notif, index) => (
                <div
                  key={notif.id || index}
                  className={`p-4 border-b border-slate-800 hover:bg-slate-800 cursor-pointer transition-colors ${!notif.is_read ? 'bg-indigo-500/5' : ''}`}
                >
                  <p className="text-sm font-semibold text-white">
                    {notif.title}
                  </p>
                  {notif.sender_company_name && (
                    <p className="text-[11px] font-medium text-indigo-400 mt-0.5">
                      {notif.sender_company_name}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {notif.description}
                  </p>

                  <p className="text-[10px] text-gray-500 mt-2">
                    {notif.created_at ? new Date(notif.created_at).toLocaleString() : ''}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
