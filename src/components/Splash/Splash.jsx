import React from 'react'
import './Splash.css'
import logo from './../../assets/logo (2).png'

export default function Splash() {
  return (
    <>
    <div className="splash d-flex justify-content-center align-items-center flex-column vh-100 gap-2">
        <img src={logo} className='shadow-pop-tr' alt="" />
        <div className="caption text-center">
            <h4 className=' h4'>Welcom!</h4>
            <p>Enjoy Your Journey</p>

        </div>
        <button className='Btn'>
            <a href="./login" className=' text-decoration-none '>Login</a>
        </button>
    </div>

    </>
  )
}
