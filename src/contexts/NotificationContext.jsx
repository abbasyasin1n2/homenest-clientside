import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`notifications_${user.email}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setNotifications(parsed);
        setUnreadCount(parsed.filter(n => !n.read).length);
      }
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  const addNotification = (notification) => {
    if (!user) return;

    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification,
    };

    const updated = [newNotification, ...notifications];
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    localStorage.setItem(`notifications_${user.email}`, JSON.stringify(updated));
  };

  const markAsRead = (notificationId) => {
    if (!user) return;

    const updated = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    localStorage.setItem(`notifications_${user.email}`, JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    if (!user) return;

    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
    localStorage.setItem(`notifications_${user.email}`, JSON.stringify(updated));
  };

  const clearAll = () => {
    if (!user) return;

    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem(`notifications_${user.email}`);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};







