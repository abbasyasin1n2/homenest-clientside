import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { 
  LayoutDashboard, 
  Building2, 
  PlusCircle, 
  Heart, 
  Star, 
  Send, 
  Inbox, 
  User, 
  Home, 
  LogOut,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
  Search,
} from 'lucide-react';
import Swal from 'sweetalert2';
import { cn } from '@/lib/utils';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Overview', exact: true },
  { path: '/my-properties', icon: Building2, label: 'My Properties' },
  { path: '/add-property', icon: PlusCircle, label: 'Add Property' },
  { path: '/wishlist', icon: Heart, label: 'Wishlist' },
  { path: '/my-ratings', icon: Star, label: 'My Ratings' },
  { path: '/my-inquiries', icon: Send, label: 'Sent Inquiries' },
  { path: '/received-inquiries', icon: Inbox, label: 'Received Inquiries' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const DashboardLayout = () => {
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been logged out successfully',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const sidebarWidth = sidebarCollapsed ? 'w-16' : 'w-64';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col",
          sidebarWidth,
          // Mobile: show/hide based on mobileSidebarOpen
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible
          "lg:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-gray-800 dark:text-white">
                Home<span className="text-green-500">Nest</span>
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FaTimes className="w-4 h-4" />
          </Button>
        </div>

        {/* Sidebar Content */}
        <ScrollArea className="flex-1 py-4">
          <div className="px-3 space-y-1">
            <p className={cn(
              "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2",
              sidebarCollapsed ? "text-center" : "px-3"
            )}>
              {sidebarCollapsed ? "•••" : "Navigation"}
            </p>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium",
                    isActive
                      ? "bg-green-500 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                    sidebarCollapsed && "justify-center px-2"
                  )
                }
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            ))}
          </div>

          <div className="px-3 mt-6 space-y-1">
            <p className={cn(
              "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2",
              sidebarCollapsed ? "text-center" : "px-3"
            )}>
              {sidebarCollapsed ? "•••" : "Quick Links"}
            </p>
            <Link
              to="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                sidebarCollapsed && "justify-center px-2"
              )}
              title={sidebarCollapsed ? "Back to Home" : undefined}
            >
              <Home className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="truncate">Back to Home</span>}
            </Link>
            <Link
              to="/all-properties"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                sidebarCollapsed && "justify-center px-2"
              )}
              title={sidebarCollapsed ? "Browse Properties" : undefined}
            >
              <Search className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="truncate">Browse Properties</span>}
            </Link>
          </div>
        </ScrollArea>

        {/* Sidebar Footer - User Profile */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-auto py-2",
                  sidebarCollapsed && "justify-center px-2"
                )}
              >
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=10b981&color=fff`}
                  alt={user?.displayName}
                  className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                />
                {!sidebarCollapsed && (
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-medium text-sm truncate text-gray-800 dark:text-white">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                )}
                {!sidebarCollapsed && <ChevronDown className="w-4 h-4 text-gray-500" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold">{user?.displayName}</span>
                  <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 w-4 h-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="cursor-pointer">
                  <LayoutDashboard className="mr-2 w-4 h-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer focus:text-red-600"
              >
                <LogOut className="mr-2 w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <FaBars className="w-5 h-5" />
            </Button>
            {/* Desktop sidebar toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? (
                <PanelLeft className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <FaSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-600" />
              )}
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
