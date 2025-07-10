
import { Link } from "react-router-dom";
import "./Cusprofile.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function CProfile() {
   const [profile,setProfile]=useState([])
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
 

    const [error, setError] = useState("");
  
         useEffect(() => {
            const fetchProfile = async () => {
              try {
                const response = await axios.get(
                  `${API_URL}/customer/profile `,
                  {
                    headers: {
                      "ngrok-skip-browser-warning": "true",
        
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                console.log("API Response:", response.data);
                setProfile(response.data) ;                                                                                                                                                                                                                                                                                                         
              } catch (error) {
                console.error(error);
                setError("Failed to fetch Profile. Please try again later.");
              }
            };
            fetchProfile();
          }, []);

  return (
    <>
      <section className="Cprofile px-5 py-2 d-flex bg-light flex-column align-items-center  justify-content-center">
        <div className="main w-90 mt-4 shadow mb-2 div">
          <div className="profile-header p-0 mb-5">
            <img
              src={profile.profile_picture}
              alt="Profile"
              className="profile-image rounded-circle"
            />
          </div>
          <button className="btn btn1 mt-5 text-light me-3">
            <Link className="link text-decoration-none " to={'/CustEdit'}>
              edit profile{" "}
            </Link>
          </button>
          <div className="details d-flex flex-column py-4 justify-content-center align-items-center w-100 mt-5 text-center">
            <h4 className=" mt-3 text-center  text-black">{profile.name}</h4>
            <p className=" w-50 d-flex justify-content-center">
             {profile.brief_description
}
            </p>
          </div>
        </div>
        <div className="w-90 mt-4 p-4 shadow mb-2 div">
          <h4>Services</h4>
             <p><strong>Email:</strong> {profile.email}</p>
    <p><strong>Phone:</strong> {profile.phone_number}</p>
    <p><strong>Contact Email:</strong> {profile.contact_email }</p>
        </div>
       
      </section>
    </>
  );
}