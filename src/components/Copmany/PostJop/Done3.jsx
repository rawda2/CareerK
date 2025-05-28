import React from 'react'
import { Link } from 'react-router-dom'
import done from './../../../assets/check.png'
export default function Done3() {
  return (
    <>
      <div className="submit done3 py-5 mt-5">
        <div className=" gap-3 d-flex  flex-column text-center justify-content-center align-items-center w-100">
        <img src={done} alt="" className='w-10'/>
        <h5><strong>"Job Posted successfully."</strong> </h5>
        <p className=' w-20'>Now you can see the applier Resume
        and invite them.</p>
        
            <button type="button" className="Btn d-flex justify-content-center mb-5 ">
               <Link to={'/postedjobs'} className=" text-decoration-none link">See ALL</Link>
              </button>

        </div>
        
    </div>
    </>
  )
}
