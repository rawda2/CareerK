import React from 'react'
import { Outlet } from 'react-router-dom';
import CNavBar from '../Copmany/CNavBar/CNavBar';
import Footer from '../Footer/Footer';
import ChatBot from '../ChatBot/ChatBot'

export default function CompanyL() {
  return (
    <>
      <CNavBar/>
      <Outlet/>
        <ChatBot/>
      <Footer/>
    </>
  

  )
}
