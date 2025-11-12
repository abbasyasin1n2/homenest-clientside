import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FaGoogle, FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser(formData.email, formData.password);
      
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back to HomeNest',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Invalid email or password. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome to HomeNest',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Google Login Failed',
        text: error.message || 'Failed to sign in with Google. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 py-12 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-500 p-3 rounded-lg shadow-md">
              <FaHome className="text-white text-3xl" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Login to your HomeNest account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FaGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-500 hover:text-green-600 font-medium">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

