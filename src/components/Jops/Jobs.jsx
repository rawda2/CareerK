// FULL EDITED JObS COMPONENT

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Jobs.css";
import axios from "axios";
import work from "./../../assets/work.png";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [current, setCurrent] = useState("jobs");

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/recommendations`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(response.data.job_recommendations || []);
        setServices(response.data.service_recommendations || []);
      } catch (error) {
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  useEffect(() => {
    const getSaved = async () => {
      try {
        const response = await axios.get(`${API_URL}/bookmarks`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        });
        const savedJobIds = response.data.map((job) => job.post_id || job.id);
        setSavedJobs(new Set(savedJobIds));
      } catch (error) {
        console.error("Error getting saved jobs:", error);
      }
    };
    getSaved();
  }, []);

  const handleSave = async (post_id) => {
    try {
      await axios.post(
        `${API_URL}/bookmarks`,
        { post_id },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedJobs((prev) => {
        const newSet = new Set(prev);
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
      toast.error("Failed to save job.");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return [
      job.title,
      job.job_type,
      job.location,
      job.salary_range,
      job.experience_required,
      job.category,
    ]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(query));
  });

  const filteredServices = services.filter((svc) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return [
      svc.title,
      svc.description,
      svc.service_type,
      svc.budget_range,
      ...(svc.required_skills || []),
    ]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(query));
  });

  const items = current === "jobs" ? filteredJobs : filteredServices;

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
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
        <nav className="d-flex flex-row-reverse gap-3 my-4">
          <button
            className={`Btn ${current === "jobs" ? "active disabled" : ""}`}
            onClick={() => setCurrent("jobs")}
          >
            Jobs
          </button>
          <button
            className={`Btn ${current === "services" ? "active disabled" : ""}`}
            onClick={() => setCurrent("services")}
          >
            Services
          </button>
        </nav>
      </section>

      <section className="body px-5 mt-4 py-4 my-0">
        <section className="ai-explanation py-3 bg-light-purple rounded-3 mx-5 mb-4">
          <div className="d-flex align-items-center">
            <i className="fas fa-robot fa-2x me-3 secondary"></i>
            <div>
              <h5 className="secondary">
                Your Personalized {current === "jobs" ? "Job" : "Service"}{" "}
                Recommendations
              </h5>
              <p className="mb-0 i">
                These {current} are selected by AI based on your profile and
                preferences.
              </p>
            </div>
          </div>
        </section>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="jops px-5 mt-2 d-flex justify-content-between">
            <div className="right d-flex flex-column align-items-start justify-content-start">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="jop w-100 rounded-2 mb-5 p-3 d-flex justify-content-between align-items-center position-relative"
                >
                  <div
                    className="details"
                    onClick={() => handleItemClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="name d-flex align-items-center">
                      <img src={work} alt="work image" />
                      <div className="details ms-2 mt-3">
                        <h4 className="text-dark" id="jop">
                          {item.title}
                        </h4>
                        <p>
                          {" "}
                          <span>{item.company_name || item.contact_info}</span>
                          <div className="dot"></div>
                          <span>{item.location}</span>
                        </p>
                        <div className="btns d-flex gap-2 flex-wrap">
                          <button className="special_button">
                            {item.job_type || item.service_type || "N/A"}
                          </button>
                          {items === filteredJobs ? (
                            <button className="special_button">
                              {item.location === "Remote"
                                ? "Remote Work"
                                : "On-Site Work"}
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                        <p className="mt-3">
                          <span>
                            {item.created_at
                              ? new Date(item.created_at).toLocaleDateString()
                              : "Date not available"}
                          </span>
                          <div className="dot"></div>
                          {items === filteredJobs ? (
                            <span>
                              {item.experience_required ||
                                "Experience not specified"}
                            </span>
                          ) : (
                            ""
                          )}
                        </p>{" "}
                      </div>
                    </div>
                  </div>

                  <div className="price me-4">
                    <div className="caption">
                      <span className="light">Category</span>
                      <p className="normal">{item.category || "Freelance"}</p>
                      <p>
                        <span className="special">
                          {item.salary_range || item.budget_range}
                        </span>
                        <span className="light">/Task</span>
                      </p>
                    </div>
                    <div className="ai-badge d-flex align-items-center mt-5">
                      <i
                        className="fas fa-robot me-2"
                        style={{ color: "#7D8AC3" }}
                      ></i>
                      <span className="special_button px-3">
                        AI Recommended
                      </span>
                    </div>
                  </div>

                  {current === "jobs" && (
                    <i
                      className={`fa-bookmark i ${
                        savedJobs.has(item.id) ? "fa-solid" : "fa-regular"
                      }`}
                      onClick={() => handleSave(item.id)}
                    ></i>
                  )}
                </div>
              ))}
            </div>

            <aside className="left rounded-2 px-3 d-flex flex-column align-items-center pt-5">
              {selectedItem ? (
                <>
                  <div className="name d-flex mt-0 text-center align-items-center flex-column justify-content-center">
                    <img src={work} alt="work image" />
                    <h4 className="text-dark mt-3" id="jop">
                      {selectedItem.title}
                    </h4>
                    <h6>{selectedItem.company_name || "Client"}</h6>
                    <p>
                      <span>
                        {selectedItem.location ||
                          new Date(
                            selectedItem.created_at
                          ).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  <div className="dates">
                    <p className="mt-2">
                      <i className="fa-regular fa-clock i"></i>
                      Deadline:{" "}
                      {selectedItem.application_deadline ||
                        selectedItem.deadline ||
                        "Not specified"}
                    </p>
                    <p className="mt-2">
                      <i className="fa-regular fa-edit i"></i>
                      Last Update:{" "}
                      {new Date(selectedItem.updated_at).toLocaleDateString()}
                    </p>
                    <div className="btns d-flex flex-column gap-3 w-100">
                      <button className="w-100 special_button">
                        {selectedItem.job_type || selectedItem.service_type}
                      </button>
                    </div>
                  </div>

                   
                    <div className="apply mt-4 w-100 d-flex justify-content-center">
                      <button>
                        {current=="jobs"? <Link className="link" to={`/fill/${selectedItem.id}`}>
                          Apply Now
                        </Link>: <Link className="link" to={`/apply-service/${selectedItem.id}`}>
                          Apply Now
                        </Link>}
                       
                      </button>
                    </div>
                  

                  <div className="JobDeatails d-flex flex-column align-items-start px-2 pt-4">
                    <ul>
                      <dt className="my-2">Required Skills</dt>
                      {(
                        selectedItem.skills ||
                        selectedItem.required_skills ||
                        []
                      ).map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                    <ul>
                      <dt className="my-2">About</dt>
                      <li className="list-unstyled">
                        {selectedItem.job_description ||
                          selectedItem.description}
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-center mt-5">
                  <p>
                    Select a {current === "jobs" ? "job" : "service"} to view
                    details
                  </p>
                </div>
              )}
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
