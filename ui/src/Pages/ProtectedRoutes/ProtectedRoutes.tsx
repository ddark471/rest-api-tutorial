// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import style from "./protectedRoutes.module.scss"
import NavBar from '../../components/NavBar';
import Sidebar from '../../components/Sidebar';

const ProtectedRoutes = () => {
  const authContext = useContext(AuthContext);
  if(!authContext || authContext?.isAuthenticated === null) return <h1>Loading...</h1>
  // If not authenticated, redirect to login
  if (authContext.isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  // Render child routes if authenticated
  return <Outlet/>;
};

export default ProtectedRoutes;
