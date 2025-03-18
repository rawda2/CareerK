import React from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import NavBar from './../NavBar/NavBar';
import Footer from '../Footer/Footer';

export default function LayOut() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token');

  const noNavBarRoutes = ['/signup', '/signupForm', '/login', '/reset', '/otp', '/new','/splash','/'];

  console.log('isAuthenticated:', isAuthenticated);
  console.log('Current Path:', location.pathname);
  console.log('Should Render NavBar and Footer:', isAuthenticated && !noNavBarRoutes.includes(location.pathname));

  return (
    <>
      {isAuthenticated && !noNavBarRoutes.includes(location.pathname) && <NavBar />}
      
      <Outlet />

      {isAuthenticated && !noNavBarRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}