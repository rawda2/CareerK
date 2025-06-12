import { Outlet } from 'react-router-dom';

import Footer from '../Footer/Footer';
import CusNav from '../Customer/CusNav/CusNav';
import ChatBot from '../ChatBot/ChatBot';

export default function CustomerL() {
  return (
    <>
      <CusNav/>
      <Outlet/>
      <ChatBot/>
      <Footer/>
    </>
  

  )
}
