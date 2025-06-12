import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Jops.css";
import axios from "axios";
import work from "./../../assets/work.png"
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Jops() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  
  const API_URL = import.meta.env.VITE_API_URL;
  const token=localStorage.getItem("token")
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/jobs/get-job-posts`, {
        headers: {
        'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true' // Add this header
        },
        withCredentials: false 
      });
        console.log("API Response:", response.data); 
         setJobs(response.data.jobs);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch jobs. Please try again later.");
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
   useEffect(() => {
      const getSaved = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/developer-profile/bookmarks`,
            {
              headers: {
                "ngrok-skip-browser-warning": "true",
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          const savedJobIds = response.data.map(job => job.post_id || job.id);
    setSavedJobs(new Set(savedJobIds));
        } catch (error) {
          console.error("Error deleting application:", error);
          alert("Failed to Get Saved Jobs. Please try again.");
        }
      };
      getSaved();
    }, []);
const handleSave = async (post_id) => {
  try {
    await axios.post(
      `${API_URL}/developer-profile/bookmark`,
      { post_id },
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSavedJobs(prev => {
      const newSet = new Set(prev); // Create a new Set from the previous state
      if (newSet.has(post_id)) {
        newSet.delete(post_id);
        toast.success("Job unsaved successfully");
      } else {
        newSet.add(post_id);
        toast.success("Job saved successfully");
      }
      return newSet;
    });
  } catch (error) {
    console.error("Error saving job:", error);
    toast.error("Failed to save job. Please try again.");
  }
};

  const filteredJobs = jobs.filter(job => {
    if (!job) return false;
    if (!searchQuery) return true; // Show all jobs when search is empty
    
    const query = searchQuery.toLowerCase();
    const searchableFields = [
      job.title,
      job.job_type,
      job.location,
      job.salary_range,
      job.experience_required,
      job.category
    ].filter(Boolean); // Remove null/undefined values
    
    return searchableFields.some(field => 
      field.toString().toLowerCase().includes(query)
    );
  });

  if (error) return <p className="text-danger">{error}</p>;

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
    <section className="header px-5 py-2 my-0">
        <div className="d-flex py-3 px-lg-5 justify-content-center gap-3 align-items-center">
          <div className="search py-1 px-2 rounded-2 mt-1 d-flex align-items-center">
            <i className="fa-solid fa-magnifying-glass fa-xl i"></i>
            <input
              type="search"
              className="fa-search border-0 py-2 px-3"
              placeholder="Job title, Keyword..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </section>

      <section className="body px-5 mt-4 py-4 my-0">
        <h5 className="ps-5">
          <span id="results">{filteredJobs.length}</span> results
          {searchQuery && <span> for "{searchQuery}"</span>}
        </h5>
        
        {isLoading ? (
          <Loader/>
        ) : (
          <div className="jops px-5 mt-2 d-flex justify-content-between">
            <div className="right d-flex flex-column align-items-start justify-content-start">
              {filteredJobs.length === 0 ? (
                <p className="text-center mt-4">
                  {searchQuery ? 
                    "No jobs found matching your search." : 
                    "No jobs available at the moment."}
                </p>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="jop w-100 rounded-2 mb-5 p-3 d-flex justify-content-between align-items-center position-relative"
                  
                  >
                    <div className="details" onClick={() => handleJobClick(job)}
                    style={{ cursor: "pointer" }}>
                      <div className="name d-flex align-items-center">
                        <img src={work} alt="work image" />
                        <div className="details ms-2 mt-3">
                          <h4 className="text-dark" id="jop">{job.title || "Untitled Position"}</h4>
                          <h6>{job.company_name || "Company not specified"}</h6>
                          <p><span>{job.location || "Location not specified"}</span></p>
                          <div className="btns d-flex gap-2 flex-wrap">
                            <button className="special_button">{job.job_type || "N/A"}</button>
                            <button className="special_button">
                              {job.location === "Remote" ? "Remote Work" : "On-Site Work"}
                            </button>
                          </div>
                          <p className="mt-3">
                            <span>{job.created_at ? new Date(job.created_at).toLocaleDateString() : "Date not available"}</span>
                            <div className="dot"></div>
                            <span>{job.experience_required || "Experience not specified"}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="price me-4">
                      <div className="caption">
                        <span className="light">Team</span>
                        <p className="normal">{job.category || "General"}</p>
                        <p>
                          <span className="special">{job.salary_range || "Salary not specified"}</span>
                          <span className="light">/Year</span>
                        </p>
                      </div>
                    </div>
<i
  className={`fa-bookmark i ${savedJobs.has(job.id) ? "fa-solid " : "fa-regular "}`}
  onClick={() => handleSave(job.id, job.job_type)}
></i>

                  </div>
                ))
              )}
            </div>

            <aside className="left rounded-2 px-3 d-flex flex-column align-items-center pt-5">
              {selectedJob ? (
                <>
                  <div className="name d-flex mt-0 text-center align-items-center flex-column justify-content-center">
                    <img src={work} alt="work image" />
                    <h4 className="text-dark mt-3" id="jop">{selectedJob.title || "Untitled Position"}</h4>
                    <h6>{selectedJob.company_name || "Company not specified"}</h6>
                    <p><span>{selectedJob.location || "Location not specified"}</span></p>
                  </div>

                  <div className="dates">
                    <p className="mt-2">
                      <i className="fa-regular fa-clock i"></i> Application Deadline:{" "}
                      {selectedJob.application_deadline || "Not specified"}
                    </p>
                    <p className="mt-2">
                      <i className="fa-regular fa-edit i"></i> Last Update:{" "}
                      {selectedJob.updated_at ? new Date(selectedJob.updated_at).toLocaleDateString() : "Not available"}
                    </p>
                    <div className="btns d-flex flex-column gap-3 w-100">
                      <button className="w-100 special_button">{selectedJob.job_type || "N/A"}</button>
                      <button className="w-100 special_button">
                        {selectedJob.location === "Remote" ? "Remote Work" : "On-Site Work"}
                      </button>
                    </div>
                  </div>

                  <div className="apply mt-4 w-100 d-flex justify-content-center">
                    <button>
<Link className="link" to={`/fill/${selectedJob.id}`}>Apply Now</Link>
                    </button>
                  </div>

                  <div className="JobDeatails d-flex flex-column align-items-start px-2 pt-4">
                    <ul>
                      <dt className="my-2">Minimum Qualifications</dt>
                      {selectedJob.skills && selectedJob.skills.length > 0 ? (
                        selectedJob.skills.map((q, i) => <li key={i}>{q}</li>)
                      ) : (
                        <li>No qualifications specified</li>
                      )}
                    </ul>
                    <ul>
                      <dt className="my-2">About the Job</dt>
                      <li className="list-unstyled">{selectedJob.job_description || "No description provided"}</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-center mt-5">
                  <p>Select a job to view details</p>
                </div>
              )}
            </aside>
          </div>
        )}
      </section> 
    </>
  );
}