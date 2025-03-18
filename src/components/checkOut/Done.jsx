import React from 'react'
import { Link } from 'react-router-dom'
export default function Done() {
  return (
    <>
      <div className="submit py-5 gap-3 d-flex  flex-column justify-content-center align-items-center">
            <i className=" fa-solid fa-circle-check text-success"></i>
            <h5><strong>"Payment Submitted successfully."</strong> </h5>
            <button type="button" className="Btn d-flex justify-content-center">
               <Link to={'/courses'} className=" text-decoration-none link">Done</Link>
              </button>
    </div>
    </>
  )
}
