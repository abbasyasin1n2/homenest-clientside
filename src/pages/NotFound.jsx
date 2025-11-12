import { Link } from 'react-router';
import { FaHome } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-green-500 animate-pulse">404</h1>
          <h2 className="text-4xl font-semibold text-gray-800 mt-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-md mx-auto">
            Oops! The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
          <Link to="/" className="inline-flex items-center gap-2">
            <FaHome />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

