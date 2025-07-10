import React, { useEffect, useState } from "react";
import "./CourseDetails.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "./../Loader/Loader";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [Header, setHeader] = useState(null);
  const [Overview, setOverview] = useState(null);
  const navigate=useNavigate()
  const [Reviews, setReviews] = useState(null);
  
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const trackId = searchParams.get("trackId");

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const [headerRes, overviewRes, contentsRes, reviewsRes] = await Promise.all([
          axios.get(`${API}/course-details/${id}/header`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }),
          axios.get(`${API}/course-details/${id}/overview`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }),
          
          axios.get(`${API}/course-details/${id}/reviews`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }),
        ]);

        setHeader(headerRes.data);
        setOverview(overviewRes.data);
        // setReviews(reviewsRes.data);
      
      
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id]);
   
  const enroll=async()=>{
      try{
         const response=await axios.post(`${API}/course-enrollment/enroll/${id}`,{},{
          headers:{
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",


          }
         })
         console.log(response)
         toast.success("Enrolled successfully")
      }
    
      catch(error){

    const msg = error?.response?.data?.message || "Something went wrong";
    toast.error(msg); // 👉 Show "Already enrolled" or fallback message
    console.log(error);
      }

  }

  if (loading || !Header || !Overview || !Reviews) return <Loader />;

  return (
    <div className="all d-flex justify-content-center py-3">
        <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
      <section className="main w-90 d-flex justify-content-center p-5">
        <div className="course-details px-4  w-60">
          <Link className=" text-decoration-none me-4  " to={`/courseList/${trackId}`}>          <i className=" fa-solid fa-arrow-left mb-2 "></i>
</Link>
          <img
            src={Header.imageUrl}
            alt={Header.name}
            className="rounded-4"
            style={{ width: "80%", height: "350px", objectFit: "contain" }}
          />
          <div className="title d-flex justify-content-between w-70 mt-3 px-2">
            <p><strong>Video Lessons:</strong> {Header.videoLessons}</p>
            <p><strong>Published:</strong> 12 Sep 2025</p>
          </div>

          <div className="details mt-3">
            <h4 className="hBold">{Header.name}</h4>
            <p className="mb-4">{Overview.description}</p>

            <h4 className="hBold">What you'll learn</h4>
            {Overview.learningObjectives?.map((item, i) => (
              <div className="detail d-flex gap-2" key={i}>
                <i className="fa-solid fa-play span mb-3"></i>
                <p>{item}</p>
              </div>
            ))}
            <button className="Btn px-5 mt-4 me-4" onClick={enroll}>Join Course</button>
            <button className="Btn px-5 mt-4" onClick={()=>navigate(`/lessons/${id}`)}>View Lessons</button>

          </div>
        

        </div>

        <div className="left w-40">
          <div className="first">
            <h3 className="hBold">Course Info</h3>
            <div className="infos pe-5 mt-3 d-flex flex-column gap-3">
              <InfoRow icon="fa-chart-simple"  label="Level" value={Overview.difficulty} />
              <InfoRow icon="fa-regular fa-clock"  label="Duration" value={Overview.totalVideoTime} />
              <InfoRow icon="fa-solid fa-certificate"  label="Certificate" value={Overview.hasCertificate ? "Yes" : "No"} />
             
            </div>
          </div>
<section className="reviews-section container my-5">
  <h5 className="fw-bold mb-4">What Clients Say?</h5>

  

  <h6 className="fw-bold mb-4">Rating</h6>

  {/* <div className="d-flex flex-column gap-4">
    {Reviews.reviews.map((review, index) => (
      <div className="border rounded p-4 shadow-sm" key={index}>
        <div className="d-flex justify-content-between align-items-center  mb-3">
          <div className="d-flex gap-3">
            <div className="img">
 <img
              src={"https://i.pravatar.cc/100?img=12"}
              alt="User Avatar"
              className="rounded-circle"
              width="20"
              height="20"
            />
            </div>
           
            <div className=" d-flex flex-column justify-content-center">
              <h6 className="mb-1">{review.developer!=" "?review.developer:"Anounymous"} {new Date(review.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} </h6>
              <div className="text-warning small d-flex">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <i
                      key={i}
                      className={`fa-star text-warning fa me-1  bg-transparent p-0 ${
                        i < review.rating ? "fas" : "far text-muted"
                      }`}
                    ></i>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <blockquote className="mb-0 text-muted">
          <p className="mb-0">{review.comment}</p>
        </blockquote>
      </div>
    ))}
  </div> */}
</section>



        </div>
        
      </section>
      
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="info d-flex justify-content-between align-items-center">
    <p><i className={`fa ${icon} me-2`}></i>{label}</p>
    <span className="me-5">{value}</span>
  </div>
);

export default CourseDetails;
