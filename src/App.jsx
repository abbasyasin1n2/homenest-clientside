import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import AllProperties from './pages/AllProperties';
import PropertyDetails from './pages/PropertyDetails';
import AddProperty from './pages/AddProperty';
import MyProperties from './pages/MyProperties';
import MyRatings from './pages/MyRatings';
import UpdateProperty from './pages/UpdateProperty';
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
        path: '/property/:id',
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-property',
        element: (
          <PrivateRoute>
            <AddProperty />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-properties',
        element: (
          <PrivateRoute>
            <MyProperties />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-ratings',
        element: (
          <PrivateRoute>
            <MyRatings />
          </PrivateRoute>
        ),
      },
      {
        path: '/update-property/:id',
        element: (
          <PrivateRoute>
            <UpdateProperty />
          </PrivateRoute>
        ),
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
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
