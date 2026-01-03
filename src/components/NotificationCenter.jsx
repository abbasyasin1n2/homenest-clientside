import { useNotifications } from '../contexts/NotificationContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { FaBell, FaCheck, FaTrash, FaHeart, FaPaperPlane, FaStar, FaHome } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationCenter = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'wishlist':
        return <FaHeart className="text-red-500" />;
      case 'inquiry':
        return <FaPaperPlane className="text-blue-500" />;
      case 'rating':
        return <FaStar className="text-yellow-500" />;
      case 'property':
        return <FaHome className="text-green-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <FaBell className="h-5 w-5" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1"
            >
              <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </Badge>
            </motion.div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold text-gray-800">Notifications</h3>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  <FaCheck className="mr-1" /> Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-xs text-red-500 hover:text-red-700"
              >
                <FaTrash className="mr-1" /> Clear
              </Button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center"
            >
              <FaBell className="mx-auto text-4xl text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No notifications yet</p>
            </motion.div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <DropdownMenuItem
                    className={`p-3 cursor-pointer ${
                      !notification.read ? 'bg-green-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3 w-full">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 mb-1">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(notification.timestamp), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </DropdownMenuItem>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter;

