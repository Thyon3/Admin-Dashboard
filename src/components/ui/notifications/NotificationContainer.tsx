"use client";
import React from "react";
import { useNotifications } from "@/context/NotificationContext";
import Toast from "@/components/ui/toast/Toast";

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          message={notification.title}
          type={notification.type}
          isVisible={true}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
