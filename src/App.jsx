import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import AllProperties from './pages/AllProperties';
import PropertyDetails from './pages/PropertyDetails';
import AddProperty from './pages/AddProperty';
import MyProperties from './pages/MyProperties';
import MyRatings from './pages/MyRatings';
import UpdateProperty from './pages/UpdateProperty';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import MyInquiries from './pages/MyInquiries';
import ReceivedInquiries from './pages/ReceivedInquiries';
import Dashboard from './pages/Dashboard';
import PropertyComparison from './pages/PropertyComparison';
import MapView from './pages/MapView';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/all-properties',
        element: <AllProperties />,
      },
      {
        path: '/map-view',
        element: <MapView />,
      },
      {
        path: '/compare',
        element: <PropertyComparison />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/terms',
        element: <Terms />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/property/:id',
        element: <PropertyDetails />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/add-property',
        element: <AddProperty />,
      },
      {
        path: '/my-properties',
        element: <MyProperties />,
      },
      {
        path: '/my-ratings',
        element: <MyRatings />,
      },
      {
        path: '/wishlist',
        element: <Wishlist />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/my-inquiries',
        element: <MyInquiries />,
      },
      {
        path: '/received-inquiries',
        element: <ReceivedInquiries />,
      },
      {
        path: '/update-property/:id',
        element: <UpdateProperty />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
