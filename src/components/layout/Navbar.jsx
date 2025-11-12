import { Link, NavLink } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { FaHome, FaBuilding, FaPlusCircle, FaListAlt, FaStar, FaBars } from 'react-icons/fa';
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
                : 'hover:bg-green-50 text-gray-700'
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
                : 'hover:bg-green-50 text-gray-700'
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
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-green-500 p-2 rounded-lg shadow-md">
              <FaHome className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Home<span className="text-green-500">Nest</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-2">{navLinks}</ul>

          {/* Auth Section - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <img
                      src={user.photoURL || 'https://via.placeholder.com/40'}
                      alt={user.displayName}
                      className="h-10 w-10 rounded-full border-2 border-green-500 object-cover"
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
          <div className="lg:hidden pb-4 border-t">
            <ul className="flex flex-col gap-2 mt-4">{navLinks}</ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              {user ? (
                <div>
                  <div className="flex items-center gap-3 mb-3 p-2 rounded-lg bg-gray-50">
                    <img
                      src={user.photoURL || 'https://via.placeholder.com/40'}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full border-2 border-green-500"
                    />
                    <div>
                      <p className="text-sm font-semibold">{user.displayName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
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

