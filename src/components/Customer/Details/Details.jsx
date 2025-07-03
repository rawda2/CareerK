import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Details.css";
import calnder from "./../../../assets/Group.png";
import money from "./../../../assets/tdesign_money-filled.png";
// import { Spinner } from "react-bootstrap";

import { useLocation } from "react-router-dom";
export default function Details() {

  console.log("Token:", localStorage.getItem("token"));



    console.log("Task ID:", id);
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/service-post/${id}`,
          {
            headers: {
               Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "ngrok-skip-browser-warning": "true"
            },
          }
        );

        setTask(response.data.post);
        console.log(
          response.data
        )
      } catch (err) {
        console.error("Failed to fetch task:", err);
        setError(err.response?.data?.message || "Failed to load task details");
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);
  const location = useLocation();
  const task = location.state?.svc;
  const applicants = task.applicants || [];

  if (!task) {
    return <p className="mt-3">No task found</p>;
  }
  const downloadCV = async (cvUrl, firstName, lastName) => {
  try {
    // If you need to send auth headers:
    const response = await fetch(cvUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${firstName}_${lastName}_CV.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download CV');
  }
};


  return (
    <section className="px-5 py-3">
      <nav className="px-5 d-flex justify-content-between align-items-center">
        <h3>Task Applicants</h3>
        <button className="Btn py-1">
          <i className="p-0 bg-transparent text-light fa-solid fa-plus"></i>{" "}
          <Link className="link" to={`/editTask/${task.id}`}>
            Edit Task
          </Link>
        </button>
      </nav>
      <div className="container mt-5">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className="d-flex gap-4">
          <p className="line"></p>
          <p>
            <strong>
              <img src={calnder} alt="" className="w-5 mb-1" />
            </strong>{" "}
            Task Deadline : {new Date(task.deadline).toLocaleString()}
          </p>
          <p className="line"></p>
          <p className="i">
            <strong>
              <img src={money} alt="" className="w-5 mb-1" />
            </strong>{" "}
            {task.budget_range} Per Task
          </p>
        </div>

        <hr />

        {applicants?.length === 0 ? (
          <p className="text-muted">No applicants yet.</p>
        ) : (
          <div className="row">
            {applicants?.map((applicant) => (
              <div key={applicant.id} className="col-md-12 mb-4">
               
                  <div className="p-3 border rounded bg-light">
                    <nav className=" d-flex justify-content-between">
                      <div className="title d-flex flex-column justify-content-start text-start">
                        <h5>
                          {applicant.firstName} {applicant.lastName}
                        </h5>
                        <h6 className="text-muted mb-1">
                          {applicant.currentTrack}
                        </h6>
                      </div>
                   
                      <div className="mt-2 d-flex gap-3">
       
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            // Handle decline logic here
                          }}
                        >
                          Decline
                        </button>
                        <button
                          className="Btn py-2 btn-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            // Handle contact logic here
                          }}
                        >
                          Contact
                        </button>
                      </div>
                
                    </nav>

                    <p>{applicant.desc}</p>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="d-flex gap-4">
                        <p className="line"></p>
                        <p className=" d-flex flex-column">
                          <p>📩 {applicant.email}</p>
                          <p>📞 {applicant.phoneNumber}</p>
                        </p>

                        <p className="line"></p>
                        <div className="left">
 <p className="i d-flex gap-1">
                          <strong>
                            <img src={money} alt="" className="w-5 mb-1" />
                          </strong>{" "}
                           {String(applicant.expectedSalary).substring(0, 3)} $
                          Per Task
                        </p>
                        
                        <p className="i d-flex gap-2 align-items-center">
                         <i className=" fa-solid fa-briefcase"></i>
                         {applicant.yearsOfExperience} Years Of Experience

                        </p>
                        </div>
                     
                       
                      </div>
                                                   <button 
  onClick={() => downloadCV(
    applicant.applicantCvLink, 
    applicant.firstName, 
    applicant.lastName
  )}
  className="Btn  h-50 mt-5 "
>
  Download CV
</button>
                    </div>
                  </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
