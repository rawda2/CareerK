import React, { useEffect, useState } from "react";
import './PostedJobs.css';
import work from "./../../../assets/work.png";
import { Link } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function PostedJobs() {
  const [current, setCurrent] = useState("jobs");
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);
  const [states, setStates] = useState([]);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/company-profile/profile`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPostedJobs(response.data.jobPosts || []);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch Profile. Please try again later.");
      }
    };
    fetchProfile();
  }, []);

  const handleApplicants = async (Jobid) => {
    try {
      const response = await axios.get(
        `${API_URL}/job-applications/${Jobid}/applications`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedApplicants(response.data.applications|| []);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch applicants. Please try again later.");
      setSelectedApplicants([]);
    }
  };
const handleStatusChange = async (applicationId, newStatus) => {
  try {
    const response = await axios.put(
      `${API_URL}/job-applications/application/${applicationId}/status`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      }
    );

    setSelectedApplicants(prev =>
      prev.map(app =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
    toast.success("Status updated successfully");
  } catch (error) {
    console.error("Full error:", {
      message: error.message,
      url: error.config?.url,
      response: error.response?.data
    });
    toast.error(error.response?.data?.message || "Failed to update status");
  }
};
  const handleCurrent = async (jobId) => {
    await handleApplicants(jobId);
    setCurrent("appls");
  };

  const handleBack = () => {
    setCurrent("jobs");
  };

  return (
    <>
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
    <section className="Posted px-5 pb-5 pt-2 d-flex bg-light flex-column align-items-center justify-content-center">

      <div className="main w-90 mt-4 rounded-4 p-4 shadow mb-2">
        {current === "jobs" ? (
          <>
            <h3>Posted Jobs</h3>
            <div className="postedJob">
              <section className="d-flex flex-column gap-0">
                {postedJobs.map((job) => (
                  <div key={job.id} className="job d-flex justify-content-between w-100 ms-0 p-5">
                    <div className="right d-flex flex-row justify-content-center align-items-center">
                      <div className="img me-4 mt-0">
                        <img src={work} alt="" className="logo-image" />
                      </div>
                      <div className="details mt-4 d-flex flex-column align-items-start">
                        <h6 className="mb-0">{job.title}</h6>
                        <p className="mb-0">{job.location}</p>
                        <p>{job.type}</p>
                      </div>
                    </div>
                    <div className="left d-flex text-center  mt-5">
                      <Link 
                        className="i text-decoration-none " 
                        onClick={() => handleCurrent(job.id)}
                      >
                        View Applicants
                      </Link>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </>
        ) : (
          <>
            <h3>
              <i className="fa-solid fa-arrow-left bg-transparent cursor-pointer" onClick={handleBack}></i> 
              Applicants
            </h3>
            <div className="appls">
              {selectedApplicants.length > 0 ? (
                <section className="d-flex flex-column gap-0">
                  {selectedApplicants.map((applicant) => (
                    <div key={applicant.id} className="job app d-flex justify-content-between w-100 ms-0 p-5">
                      <div className="right d-flex flex-row justify-content-center align-items-center">
                        <div className="img me-4 mt-0">
                          <img 
                            src={applicant.photo || work} 
                            alt={applicant.name} 
                            className="logo-image" 
                          />
                        </div>
                        <div className="details mt-4 d-flex flex-column align-items-start">
                          <h6 className="mb-0">{applicant.name}</h6>
                          <p>{applicant.email}</p>
                          <p>{applicant.phone}</p>
                          <p>Years Of Experience: {applicant.years_of_experience}</p>
                          <p>Expected Salary: {applicant.expected_salary}</p>
                          <label>
      Status:
     <select 
  className="p-1 rounded ms-2"
  value={applicant.status || 'pending'} // Fallback to 'pending' if undefined
  onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
  disabled={!applicant.id} // Disable if no ID
>
  <option value="pending">Pending</option>
  <option value="accepted">Accepted</option>
  <option value="rejected">Rejected</option>
</select>
    </label>
                        </div>
                      </div>
                      <div className="left d-flex justify-content-center align-items-center mt-5 me-5 gap-2">
<a
  href={applicant.uploaded_cv}
  className="i text-decoration-none btnn"
  download="Rawda-Ashor-CV.docx"
  target="_blank" 
  rel="noopener noreferrer"
>
  Resume
</a>
                        <Link className="i text-decoration-none Btn">Contact</Link>
                      </div>
                    </div>
                  ))}
                </section>
              ) : (
                <p>No applicants found for this job.</p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
    </>
    
  );
}