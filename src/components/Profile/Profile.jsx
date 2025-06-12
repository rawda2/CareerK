import React from 'react'
import profile from './../../assets/profile.png'
import './Profile.css'
import cert1 from './../../assets/cert1.png'
import cert2 from './../../assets/cert2.png'
import cert3 from './../../assets/cert3.png'
import { Link } from 'react-router-dom';

import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function Profile() {
    const certifications = [
        { desc:"Certificate of Completion",name: 'Udemy', image:cert1 },
        { desc:"Certificate of Completion",name: 'Coursera', image: cert2},
        { desc:"Certificate of Completion",name: 'Harvard Online', image:cert3 },
      ];
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
              setProfile(response.data.applications);
            } catch (error) {
              console.error(error);
              setError("Failed to fetch Profile. Please try again later.");
            }
          };
          fetchProfile();
        }, []);
  return (
    <>
          <div className="container my-5 ">
      <div className="row d-flex justify-content-center ">
        <div className="col-lg-10">
          <div className="card mb-4 shadow">
            <div className="card-body text-center p-0 position-relative">
              <div className="profile-header p-0 mb-5">
                <img src={profile} alt="Profile" className="profile-image rounded-circle" />
              </div>
              <button className="btn btn1 mt-5 text-light"><Link className='link text-decoration-none' to={'/editProfile'}>Edit Profile</Link></button>

              <div className="details mt-5 pt-5 px-4 d-flex flex-column align-items-center">
              <h4>Kate Elodie Mohr</h4>
              <p>Web Developer and Digital UI/UX Designer</p>
              <span>Australia</span>
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
              I am a passionate and creative UX Designer with a strong commitment to crafting intuitive and impactful user experiences. With a background in [your previous field or education], I specialize in understanding user needs and translating them into design solutions that enhance usability, accessibility, and overall satisfaction.
              </p>
            </div>
          </div>

          <div className="card py-3 mb-4 shadow">
            <div className="card-body ">
              <h5>Services</h5>
              <p>
              As a UX Designer, I offer services in user research, wireframing, prototyping, visual/UI design, and usability testing. I also provide UX strategy, ongoing optimization, and collaboration with developers to deliver seamless, user-centered experiences.              </p>
              <button className="btn  ">Request services</button>
            </div>
          </div>

          <div className="card py-3 mb-4 shadow">
            <div className="card-body position-relative">
              <h5>My Cv</h5>
              <p>AI will create cv for you. click here</p>
              <button className="btn position-absolute float text-light"><Link className='link text-decoration-none' to={'/cv'}>Update my cv</Link></button>
            </div>
          </div>

          <div className="card py-3 mb-4 shadow">
            <div className="card-body work  d-flex flex-column gap-3 ">
              <h5>Work Experience (1/2)</h5>
              <p>Updated list of all the places I’ve worked at 2016—2023</p>
              <div className=' d-flex justify-content-between'>
              <div className="left col-8">
              <h5>Product Visual Designer, Expert in UI Design</h5>
                <p>May 2022 - Present</p>
                <p>Currently serving as a Senior UI/UX Designer, focusing on delivering high-impact visual designs and user experiences for major brands</p>
                <p>Expert in utilizing the latest design tools and technologies to create visually stunning and highly functional digital products. Recognized for exceptional leadership in guiding design teams and mentoring junior designers. Continuously pushing the boundaries of digital design to create trendsetting and user-centric solutions.</p>
              </div>
              <div className="right col-4">
              <p>Tools:</p>
              <div className="spans d-flex flex-wrap">
                <span className=' p-2 ms-2 mb-2'>Figma</span>
                <span className=' p-2 ms-2 mb-2'>Figma</span>
                <span className=' p-2 ms-2 mb-2'>Figma</span>
                <span className=' p-2 ms-2 mb-2'>Figma</span>
                <span className=' p-2 ms-2 mb-2'>Figma</span>
                <span className=' p-2 ms-2 mb-2'>Figma</span>
                <span className=' p-2 ms-2 mb-2'>Figma</span>

              </div>

              </div>
              </div>
              <div className=' d-flex justify-content-between'>
              <div className="left col-8">
              <h5>Product Visual Designer, Expert in UI Design</h5>
                <p>May 2022 - Present</p>
                <p>Currently serving as a Senior UI/UX Designer, focusing on delivering high-impact visual designs and user experiences for major brands</p>
                <p>Expert in utilizing the latest design tools and technologies to create visually stunning and highly functional digital products. Recognized for exceptional leadership in guiding design teams and mentoring junior designers. Continuously pushing the boundaries of digital design to create trendsetting and user-centric solutions.</p>
              </div>
              <div className="right col-4">
              <p>Tools</p>
              <div className="spans d-flex flex-wrap">
                <span className=' p-2 ms-2 mb-2'>Figma</span>
                <span className=' p-2 ms-2 mb-2'>Figma</span>
                <span className=' p-2 ms-2 mb-2'>Figma</span>
                <span className=' p-2 ms-2 mb-2'>Figma</span>
                <span className=' p-2 ms-2 mb-2'>Figma</span>
                <span className=' p-2 ms-2 mb-2'>Figma</span>
                <span className=' p-2 ms-2 mb-2'>Figma</span>

              </div>

              </div>
              </div>
            </div>
          </div>

          <div className="card mb-4 shadow py-3">
      <div className="card-body">
        <h5 className=' mb-3'>Certifications</h5>
        <div className="d-flex justify-content-around">
          {certifications.map((cert, index) => (
            <div key={index} className="text-start d-flex gap-2">
              <img src={cert.image} alt={cert.name} className="certification-image mb-2" />
              <div className="cap">
              <span>{cert.name}</span>
              <p>{cert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

          <div className="card mb-4 shadow">
            <div className="card-body">
              <h5 className=' mb-4'>Education</h5>
              <div className=' ms-5 mt-3'>
                <h6>Gryffindor</h6>
                <p>Bachelor of Fine Arts - BFA, Art History, Criticism and Conservation</p>
                <p>2015 - 2019</p>
              </div>
              <div className=' ms-5 mt-3'>
                <h6>Hufflepuff</h6>
                <p>Bachelor of Fine Arts - BFA, Art History, Criticism and Conservation</p>
                <p>2015 - 2019</p>
              </div>
              <div className=' ms-5 mt-3'>
                <h6>Ravenclaw</h6>
                <p>Bachelor of Fine Arts - BFA, Art History, Criticism and Conservation</p>
                <p>2015 - 2019</p>
              </div>
              <div className=' ms-5 mt-3'>
                <h6>Slytherin</h6>
                <p>Bachelor of Fine Arts - BFA, Art History, Criticism and Conservation</p>
                <p>2015 - 2019</p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
    </>
  )
}
