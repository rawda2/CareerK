import React from "react";
import profileimg from "./../../../assets/profile.png";
import { Link } from "react-router-dom";
import "./Cprofile.css";
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
                  `${API_URL}/company/profile `,
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
            <Link className="link text-decoration-none " to={'/Csettings'}>
              edit profile{" "}
            </Link>
          </button>
          <div className="details d-flex flex-column py-4 justify-content-center align-items-center w-100 mt-5 text-center">
            <h4 className=" mt-3 text-center  text-black">{profile.company_name}</h4>
            <p className=" w-50">
             {profile.brief_description
}
            </p>
          </div>
        </div>
        <div className="w-90 mt-4 p-4 shadow mb-2 div">
          <h4>Services</h4>
          <p className="p">
            A finance company provides a variety of financial services to
            individuals, businesses, and other organizations.
          </p>
          <p className="p">
            Loan Services: Finance company offer personal loans, business loans,
            and auto loans. They may provide both secured and unsecured loans,
            depending on the client's needs.
          </p>{" "}
          <p className="p">
            Credit Services: finance company provide credit lines and credit
            cards to help individuals and businesses manage cash flow.
          </p>{" "}
          <p className="p">
            A finance company provides a variety of financial services to
            individuals, businesses, and other organizations.
          </p>
        </div>
        <div className="w-90 mt-4 p-4 shadow mb-2 div">
          <h4>About Company</h4>
          <span>Overview</span>
          <p className="p">
          Empowering you to pay in installments for everything you need, with ease and convenience.
          </p>
          <span>Industry</span>
          <p className="p">
          Financial Services.
          </p>
          <span>Company size</span>

          <p className="p">
          501-1,000 employees.
          </p>{" "}
         
        </div>
        <div className="w-90 mt-4 p-4 mb-5 shadow mb-2 div">
          <h4>Location</h4>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54837.4349909277!2d30.958156567520717!3d30.79310701840792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c95daafcf035%3A0x7421820c5e8cae42!2sTanta%2C%20Tanta%20Qism%202%2C%20Tanta%2C%20Gharbia%20Governorate!5e0!3m2!1sen!2seg!4v1746112400356!5m2!1sen!2seg"  height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>       
         
        </div>
      </section>
    </>
  );
}
