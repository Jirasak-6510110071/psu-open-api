import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
import Tutor from './pages/Tutor'
import { AuthProvider } from './context/AuthProvider';
import { DataProvider } from './context/DataContext';
import Appointment from './pages/Schedule'
import Login from './pages/Login'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "home",
    element: <Home></Home>,
  },
  {
    path: "tutor",
    element: <Tutor></Tutor>,
  },
  {
    path: "schedule",
    element: <Appointment></Appointment>,
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
)
