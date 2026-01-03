import { Link, NavLink } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useComparison } from '../../contexts/ComparisonContext';
import { FaHome, FaBuilding, FaPlusCircle, FaListAlt, FaStar, FaBars, FaMoon, FaSun, FaHeart, FaPaperPlane, FaInbox, FaUser, FaChartLine, FaExchangeAlt, FaMapMarkedAlt, FaUsers } from 'react-icons/fa';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NotificationCenter from '../NotificationCenter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { comparisonList } = useComparison();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-lg transition-all font-medium text-sm ${
              isActive
                ? 'bg-green-500 text-white'
                : 'hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
            }`
          }
        >
          <FaHome className="text-base" /> <span className="hidden xl:inline">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-properties"
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-lg transition-all font-medium text-sm whitespace-nowrap ${
              isActive
                ? 'bg-green-500 text-white'
                : 'hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
            }`
          }
        >
          <FaBuilding className="text-base" /> <span className="hidden xl:inline">All Properties</span>
        </NavLink>
      </li>
      {!user && (
        <li>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-lg transition-all font-medium text-sm whitespace-nowrap ${
                isActive
                  ? 'bg-green-500 text-white'
                  : 'hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
              }`
            }
          >
            <FaUsers className="text-base" /> <span className="hidden xl:inline">About Us</span>
          </NavLink>
        </li>
      )}
      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-lg transition-all font-medium text-sm ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`
              }
            >
              <FaChartLine className="text-base" /> <span className="hidden xl:inline">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-property"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-lg transition-all font-medium text-sm whitespace-nowrap ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`
              }
            >
              <FaPlusCircle className="text-base" /> <span className="hidden xl:inline">Add Property</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-properties"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-lg transition-all font-medium text-sm whitespace-nowrap ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-green-50 text-gray-700 dark:text-gray-200'
                }`
              }
            >
              <FaListAlt className="text-base" /> <span className="hidden xl:inline">My Properties</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-ratings"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-lg transition-all font-medium text-sm whitespace-nowrap ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`
              }
            >
              <FaStar className="text-base" /> <span className="hidden xl:inline">My Ratings</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-lg transition-all font-medium text-sm ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`
              }
            >
              <FaHeart className="text-base" /> <span className="hidden xl:inline">Wishlist</span>
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <div className="bg-green-500 p-2 rounded-lg shadow-md">
              <FaHome className="text-white text-xl" />
            </div>
            <span className="text-xl xl:text-2xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
              Home<span className="text-green-500">Nest</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">{navLinks}</ul>

          {/* Auth Section - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Map View Button */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-green-50 dark:hover:bg-gray-800"
            >
              <Link to="/map-view">
                <FaMapMarkedAlt className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
            </Button>

            {/* Comparison Button */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-green-50 dark:hover:bg-gray-800 relative"
            >
              <Link to="/compare">
                <FaExchangeAlt className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                {comparisonList.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {comparisonList.length}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Notification Center */}
            {user && <NotificationCenter />}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-green-50 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <FaSun className="h-5 w-5 text-yellow-500" />
              ) : (
                <FaMoon className="h-5 w-5 text-gray-600" />
              )}
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=10b981&color=fff&size=200&bold=true`}
                      alt={user.displayName || 'User'}
                      className="h-10 w-10 rounded-full border-2 border-green-500 object-cover"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=10b981&color=fff&size=200&bold=true`;
                      }}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">
                        {user.displayName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      <FaUser className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-inquiries" className="w-full cursor-pointer">
                      <FaPaperPlane className="mr-2 h-4 w-4" />
                      My Inquiries
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/received-inquiries" className="w-full cursor-pointer">
                      <FaInbox className="mr-2 h-4 w-4" />
                      Received Inquiries
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer focus:text-red-600"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="outline" asChild className="border-green-500 text-green-500 hover:bg-green-50">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-green-500 hover:bg-green-600">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <FaBars className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden pb-4 border-t dark:border-gray-800">
            <ul className="flex flex-col gap-2 mt-4">{navLinks}</ul>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Button
                variant="outline"
                onClick={toggleTheme}
                className="w-full mb-3 border-gray-300 dark:border-gray-700"
              >
                {theme === 'dark' ? (
                  <>
                    <FaSun className="mr-2 h-4 w-4 text-yellow-500" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <FaMoon className="mr-2 h-4 w-4" />
                    Dark Mode
                  </>
                )}
              </Button>
              {user ? (
                <div>
                  <div className="flex items-center gap-3 mb-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=10b981&color=fff&size=200&bold=true`}
                      alt={user.displayName || 'User'}
                      className="w-10 h-10 rounded-full border-2 border-green-500 object-cover"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=10b981&color=fff&size=200&bold=true`;
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold dark:text-white">{user.displayName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button variant="outline" asChild className="border-green-500 text-green-500">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="bg-green-500 hover:bg-green-600">
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

