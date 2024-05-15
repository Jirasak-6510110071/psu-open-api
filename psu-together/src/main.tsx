import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Tutor from './pages/Tutor';
import { AuthProvider } from './context/AuthProvider';
import { DataProvider } from './context/DataContext';
import Appointment from './pages/Schedule';
import Login from './pages/Login';
import RedirectPage from './pages/RedirectPage';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './components/Logout';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/redirect',
    element: <RedirectPage />,
  },
  {
    path: '/logout', 
    element: <Logout />,
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/tutor',
        element: <Tutor />,
      },
      {
        path: '/schedule',
        element: <Appointment />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
);
