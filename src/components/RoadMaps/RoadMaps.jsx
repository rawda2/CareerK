import  { useEffect, useState } from 'react'
import './RoadMaps.css'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
export default function RoadMaps() {
    const [roadmaps,setMaps] =useState([])
 

const token = localStorage.getItem("token");
const API = import.meta.env.VITE_API_URL;
const [loading,setLoading]=useState(true)

useEffect(() => {
  const getMaps = async () => {
    try {
      const response = await axios.get(`${API}/tracks-page/tracks`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Data:", response.data);
      setMaps(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching tracks:", error); 
    }
  };

  getMaps();
}, []);

  return (
    <>

   <div className=" d-flex flex-column justify-content-center align-items-center mt-0 py-4">
    <h4 className=' hBold '>Role-based Roadmaps</h4>
   {loading?<Loader/>: <div className="maps w-100 d-flex flex-wrap p-5 gap-3  align-items-center">
     {roadmaps.map((map)=>(
      <div className="roadmap d-flex w-48 " key={map.id}>
        <div className="h  w-40">
        <img src={map.image_url} className=' w-100' alt="" />
        </div>
        <div className="details ms-2 pt-2 d-flex flex-column justify-content-center">
        <Link to={`/roadmaps/${map.track_id}`} className=' text-decoration-none px-3'>

            <h5 className=' i'>{map.track_title}</h5>
            <p>{map.total_duration}</p>
            <span className=' text-success'><i className=' fa-solid fa-forward-step'></i> Start Point </span>
            <p>{map.start_course}</p>
            <span className=' text-danger'><i className=' fa-solid fa-backward-step'></i> End Point </span>
            <p>{map.end_course}</p>
</Link>

        </div>
      </div>


      ))}
     </div>}
  


   </div>
 
     
    </>
  )
}
