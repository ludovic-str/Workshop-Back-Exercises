import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import MyProductsPage from './pages/ManageProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RegisterPage from './pages/RegisterPage';
import AddProductsPage from './pages/AddProductPage';

// ----------------------------------------------------------------------

export default function Router({ loggedIn }) {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: loggedIn === true ? <DashboardLayout /> : <Navigate to="/login" replace />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'manage', element: <MyProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'product/add', element: <AddProductsPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
