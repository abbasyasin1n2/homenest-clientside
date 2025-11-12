import { Link } from 'react-router';
import { FaHome, FaFacebook, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
              <div className="bg-green-500 p-2 rounded-lg shadow-md">
                <FaHome className="text-white text-2xl" />
              </div>
              <span className="text-2xl font-bold text-white">
                Home<span className="text-green-500">Nest</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Your trusted partner in finding the perfect property in Bangladesh. 
              We connect property owners with potential buyers and renters across the country.
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-green-500 hover:text-white transition-colors"
                asChild
              >
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-xl" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-green-500 hover:text-white transition-colors"
                asChild
              >
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="text-xl" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-green-500 hover:text-white transition-colors"
                asChild
              >
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-xl" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-green-500 hover:text-white transition-colors"
                asChild
              >
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm hover:text-green-500 transition-colors inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/all-properties" className="text-sm hover:text-green-500 transition-colors inline-block">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/add-property" className="text-sm hover:text-green-500 transition-colors inline-block">
                  Add Property
                </Link>
              </li>
              <li>
                <Link to="/my-properties" className="text-sm hover:text-green-500 transition-colors inline-block">
                  My Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="font-semibold text-gray-200">Address:</span>
                <br />
                <span className="text-gray-400">Dhaka, Bangladesh</span>
              </li>
              <li>
                <span className="font-semibold text-gray-200">Phone:</span>
                <br />
                <span className="text-gray-400">+880 1XXX-XXXXXX</span>
              </li>
              <li>
                <span className="font-semibold text-gray-200">Email:</span>
                <br />
                <span className="text-gray-400">info@homenest.com</span>
              </li>
              <li>
                <span className="font-semibold text-gray-200">Hours:</span>
                <br />
                <span className="text-gray-400">Sat - Thu: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm hover:text-green-500 transition-colors inline-block">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-500 transition-colors inline-block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-500 transition-colors inline-block">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-500 transition-colors inline-block">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-white">HomeNest</span>. All rights reserved. Made with <FaHeart className="inline text-red-500" /> by Abbas
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

