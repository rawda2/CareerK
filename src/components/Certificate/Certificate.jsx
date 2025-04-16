import React from 'react'
import { Link } from 'react-router-dom'
import './Certificate.css'
import cert from '../../assets/cert.png'

export default function Certificate() {
  return (
    <>
        <div className="body p-5 position-relative w-100">
            <button className='Btn position-absolute'><Link className=' text-decoration-none ' to={'/done2'}>Download</Link> <i className=' fa-solid fa-download text-light'></i></button>
            <div className="cert d-flex justify-content-center align-items-center p-5">
                <img src={cert} alt=""  className=' d-block w-80 rounded-4'/>
            </div>
        </div>
    </>
  )
}
