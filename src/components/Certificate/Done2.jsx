import React from 'react'
import { Link } from 'react-router-dom'
import done from '../../assets/done.png'
export default function Done2() {
  return (
    <>
      <div className="submit py-5">
        <div className="main  py-5 gap-3 d-flex  flex-column justify-content-center align-items-center w-100">
        <img src={done} alt="" className='w-15'/>
            <h5><strong>"Certification  Downloaded successfully"</strong> </h5>
            <button type="button" className="Btn d-flex justify-content-center mb-5 ">
               <Link to={'/courses'} className=" text-decoration-none link">Back</Link>
              </button>

        </div>
        
    </div>
    </>
  )
}
