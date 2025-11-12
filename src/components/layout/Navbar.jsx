import { Link, NavLink } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FaHome, FaBuilding, FaPlusCircle, FaListAlt, FaStar, FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
              isActive
                ? 'bg-green-500 text-white'
                : 'hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
            }`
          }
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-properties"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
              isActive
                ? 'bg-green-500 text-white'
                : 'hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
            }`
          }
        >
          <FaBuilding /> All Properties
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-property"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-green-50 text-gray-700'
                }`
              }
            >
              <FaPlusCircle /> Add Property
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-properties"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-green-50 text-gray-700'
                }`
              }
            >
              <FaListAlt /> My Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-ratings"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-green-50 text-gray-700'
                }`
              }
            >
              <FaStar /> My Ratings
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
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-green-500 p-2 rounded-lg shadow-md">
              <FaHome className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              Home<span className="text-green-500">Nest</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-2">{navLinks}</ul>

          {/* Auth Section - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
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
                        console.log('Image failed to load, falling back to avatar');
                        e.target.onerror = null; // Prevent infinite loop
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

