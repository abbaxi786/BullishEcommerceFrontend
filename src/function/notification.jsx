import { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const showToast = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  return (
    <NotificationContext.Provider
      value={{ notification, showToast, hideToast }}
    >
      {children}
    </NotificationContext.Provider>
  );
};