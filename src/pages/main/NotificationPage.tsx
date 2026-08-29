
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  BookOpen,
  Award,
  MessageCircle,
  X,
} from "lucide-react";
import { useState } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "course" | "achievement" | "message" | "system";
  read: boolean;
}

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Course Available",
      message: "A new React Development course is now available.",
      time: "10 minutes ago",
      type: "course",
      read: false,
    },
    {
      id: 2,
      title: "Learning Reminder",
      message: "You have a lesson waiting for you. Keep learning!",
      time: "1 hour ago",
      type: "system",
      read: false,
    },
    {
      id: 3,
      title: "Achievement Unlocked",
      message: "Congratulations! You completed your first course.",
      time: "Yesterday",
      type: "achievement",
      read: true,
    },
    {
      id: 4,
      title: "New Message",
      message: "Your instructor sent you a new message.",
      time: "Yesterday",
      type: "message",
      read: true,
    },
  ]);

  // Mark one notification as read
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Delete one notification
  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  // Delete all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  // Get icon based on notification type
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "course":
        return <BookOpen size={22} />;

      case "achievement":
        return <Award size={22} />;

      case "message":
        return <MessageCircle size={22} />;

      default:
        return <Bell size={22} />;
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 md:px-8">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Notifications
            </h1>

            <p className="text-gray-500 mt-1">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${
                    unreadCount > 1 ? "s" : ""
                  }.`
                : "You are all caught up!"}
            </p>
          </div>

          {/* Actions */}
          {notifications.length > 0 && (
            <div className="flex gap-2">

              <button
                type="button"
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition"
              >
                <CheckCheck size={18} />
                <span>Mark all read</span>
              </button>

              <button
                type="button"
                onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
              >
                <Trash2 size={18} />
                <span>Clear</span>
              </button>

            </div>
          )}

        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {notifications.length === 0 ? (

            /* Empty state */
            <div className="flex flex-col items-center justify-center py-20 px-4">

              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell
                  size={30}
                  className="text-gray-400"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                No notifications
              </h2>

              <p className="text-gray-500 text-center mt-2">
                You don't have any notifications right now.
              </p>

            </div>

          ) : (

            <div>
              {notifications.map((notification) => (

                <div
                  key={notification.id}
                  className={`flex gap-4 p-5 border-b last:border-b-0 transition ${
                    notification.read
                      ? "bg-white"
                      : "bg-gray-50"
                  }`}
                >

                  {/* Icon */}
                  <div className="flex-shrink-0">

                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center ${
                        notification.read
                          ? "bg-gray-100 text-gray-500"
                          : "bg-black text-white"
                      }`}
                    >
                      {getIcon(notification.type)}
                    </div>

                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <h3
                          className={`font-semibold ${
                            notification.read
                              ? "text-gray-700"
                              : "text-gray-900"
                          }`}
                        >
                          {notification.title}
                        </h3>

                        <p className="text-gray-500 text-sm mt-1">
                          {notification.message}
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                          {notification.time}
                        </p>
                      </div>

                      {/* Unread indicator */}
                      {!notification.read && (
                        <span className="w-2.5 h-2.5 bg-black rounded-full flex-shrink-0 mt-2" />
                      )}

                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-3">

                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                          className="flex items-center gap-1 text-sm text-gray-700 hover:text-black"
                        >
                          <Check size={16} />
                          Mark as read
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          deleteNotification(notification.id)
                        }
                        className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}
            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default NotificationPage;

