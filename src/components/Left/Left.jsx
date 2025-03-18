import React from 'react'
import './Left.css'
import logo from './../../assets/logo (2).png'

export default function Left() {
  return (
    <>
     <section className="left m-0 vh-100 d-flex  flex-column justify-content-center align-items-center w-50">
            <div className="logo ">
              <img src={logo} alt="" />
              </div>
          </section></>
  )
}
