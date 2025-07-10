import React from 'react'
import profileImg from './../../assets/profile.png'
import './Profile.css'
import cert1 from './../../assets/cert1.png'
import cert2 from './../../assets/cert2.png'
import cert3 from './../../assets/cert3.png'
import { Link } from 'react-router-dom';

import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function Profile() {
    
   const [profile,setProfile]=useState([])
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");


       useEffect(() => {
          const fetchProfile = async () => {
            try {
              const response = await axios.get(
                `${API_URL}/developer/profile`,
                {
                  headers: {
                    "ngrok-skip-browser-warning": "true",
      
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log("API Response:", response.data);
              setProfile(response.data);
            } catch (error) {
              console.error(error);
              setError("Failed to fetch Profile. Please try again later.");
            }
          };
          fetchProfile();
        }, []);
        const downloadDeveloperCV = async () => {
          try {
            const API = import.meta.env.VITE_API_URL;
            
            const response = await axios.get(
              `${API}/cv/download?type=developer&id=${localStorage.getItem("user_id")}&subtype=generated`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "ngrok-skip-browser-warning": "true",
                },
                responseType: 'blob' // This is crucial for file downloads
              }
            );
        
            // Create a blob from the response data
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            
                  window.open(url, "_blank");

            
            // Clean up
            window.URL.revokeObjectURL(url);
           
          } catch (error) {
            console.error('Error downloading developer CV:', error);
            alert('Failed to download CV. Please try again.');
          }
        };
  return (
    <>
          <div className=" my-5 w-75 mx-3 mt-4 p-0">
      <div className="row d-flex justify-content-center mx-0  p-0">
        <div className="col-lg-12">
          <div className="card mb-4 shadow">
            <div className="card-body text-center p-0 position-relative">
              <div className="profile-header p-0 mb-5">
                <img src={profile.profilePictureLink} alt="Profile" className="profile-image rounded-circle" />
              </div>

              <div className="details mt-5 pt-5 px-4 d-flex flex-column align-items-center">
              <h4>{profile.first_name + " " +profile.last_name}</h4>
           <p>
  {profile.current_track
    ? profile.current_track.charAt(0).toUpperCase() + profile.current_track.slice(1)
    : ""} developer
</p>

              <span>{profile.
address
}</span>
              <div className="d-flex justify-content-around my-3 gap-3 ">
                <div className=' text-start px-3 w-50 rounded-3 py-2'>
                  <h6>Open to work</h6>
                  <p>Digital Designer, UI/UX Designer, Website Developer...</p>
                </div>
                <div className=' text-start px-3 w-50 rounded-3 py-2'>
                  <h6>Providing Services</h6>
                  <p>SEO Marketing, Website Optimization, Web Design...</p>
                </div>
              </div>
              </div>
              
            </div>
          </div>

          <div className="card py-3 mb-4 shadow">
            <div className="card-body">
              <h5>About</h5>
              <p>
{profile.
brief_bio}              </p>
            </div>
          </div>

          <div className="card py-3 mb-4 shadow">
            <div className="card-body ">
              <h5>Services</h5>
              <p>
              As a UX Designer, I offer services in user research, wireframing, prototyping, visual/UI design, and usability testing. I also provide UX strategy, ongoing optimization, and collaboration with developers to deliver seamless, user-centered experiences.              </p>
            </div>
          </div>

          <div className="card py-3 mb-4 shadow">
            <div className="card-body position-relative">
              <h5>My Cv</h5>
              <p>AI will create cv for you. click here</p>
              <button className="btn position-absolute float text-light" onClick={downloadDeveloperCV}>View my cv</button>

            </div>
          </div>

       <div className="card py-3 mb-4 shadow">
  <div className="card-body">
    <h5 className="mb-3">My Skills</h5>
    <div className="d-flex flex-wrap gap-2">
     {Array.isArray(profile.skills) && profile.skills.map((skill, index) => (
  <span key={index} className="special_button fs-6 px-3 py-2 rounded-pill">
    {skill}
  </span>
))}

    </div>
  </div>
</div>


        <div className="card py-3 mb-4 shadow">
  <div className="card-body">
    <h5 className="mb-3">Interested Courses</h5>
    <ul className="list-group list-group-flush">
      {Array.isArray(profile.interested_courses) && profile.interested_courses.map((course, index) => (
  <li key={index} className="list-group-item">
    <i className="fas fa-book i me-2"></i> {course}
  </li>
))}

    </ul>
  </div>
</div>

        </div>

        
      </div>
    </div>
    </>
  )
}
