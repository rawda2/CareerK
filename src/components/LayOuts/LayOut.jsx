import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import NavBar from './../NavBar/NavBar';
import Footer from '../Footer/Footer';
// import ChatBot from 'react-chatbotify'
import ChatBot from './../ChatBot/ChatBot'
import './Layout.css'
import CVButton from '../Cv/CVButton';

export default function LayOut() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token');

  const noNavBarRoutes = ['/signup', '/signupForm', '/login', '/reset', '/otp', '/new','/splash','/','/continue','/csignup','/custsignUp'];

  console.log('isAuthenticated:', isAuthenticated);
  console.log('Current Path:', location.pathname);
  console.log('Should Render NavBar and Footer:', isAuthenticated && !noNavBarRoutes.includes(location.pathname));

 
  return (
    <>
      {isAuthenticated && !noNavBarRoutes.includes(location.pathname) && <NavBar />}
      
      <Outlet />
     
      {isAuthenticated && !noNavBarRoutes.includes(location.pathname) && <ChatBot />}
      {isAuthenticated && !noNavBarRoutes.includes(location.pathname) && <CVButton />}



      {isAuthenticated && !noNavBarRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}