// import { Slab } from "react-loading-indicators";
import load from './../../assets/load.json'
import Lottie from "lottie-react";
export default function Loader() {
  return (
    <div className="loading w-100 h-100 align-items-center d-flex justify-content-center">
      {/* <Slab color="#7D8AC3" size="medium" text="" textColor="" />
       */}
         <Lottie animationData={load} loop={true} style={{ height: 150 }} />
       

          </div>
  )
}
