import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Jops.css";
import axios from "axios";
import work from "./../../assets/work.png";

export default function Jops() {
  const [jobs, setJobs] = useState([]); // State to store jobs
  const [error, setError] = useState(""); // State to handle errors
  const [selectedJob, setSelectedJob] = useState(null); // State to track selected job
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "https://jsonfakery.com/jobs",
          responseType: "json",
        });
        console.log(response.data);
        setJobs(response.data.slice(0, 15));
      } catch (error) {
        console.error(error);
        setError("Failed to fetch jobs. Please try again later."); // Set error message
      }
    };

    fetchJobs();
  }, []);

  // Handle job click
  const handleJobClick = (job) => {
    setSelectedJob(job);
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    );
  });

  // Display error message if there's an error
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>
      <section className="header px-5 py-2 my-0">
        <div className="d-flex py-3 px-lg-5 justify-content-center gap-3 align-items-center">
          <div className="search py-1 px-2 rounded-2 mt-1 d-flex align-items-center">
            <i className="fa-solid fa-magnifying-glass  fa-xl i"></i>
            <input
              type="search"
              className="fa-search border-0 py-2 px-3"
              placeholder="Job title, Keyword..."
              onChange={(e) => setSearchQuery(e.target.value)} // Track search query
            />
          </div>
          <button className="find">
            <Link className="link">Search</Link>
          </button>
        </div>
        <div className="filters px-lg-5 d-flex justify-content-center">
          <div className="filter ms-2">
            <select
              name="filters"
              id="filters"
              className="list px-2 d-flex align-items-center justify-content-center py-2 rounded"
            >
              <option value="Filter With" selected>
                Filter With
              </option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
          <div className="filter ms-2">
            <select
              name="filters"
              id="filters"
              className="list px-2 d-flex align-items-center justify-content-center py-2 rounded"
            >
              <option value="Filter With" selected>
                Filter With
              </option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
        </div>
      </section>
      <section className="body px-5 mt-4 py-4 my-0">
        <h5 className="ps-5">
          <span id="results">{filteredJobs.length}</span> results
        </h5>
        <div className="jops px-5 mt-2 d-flex justify-content-between">
          <div className="right d-flex flex-column align-items-start justify-content-start">
            {filteredJobs.length === 0 ? (
              <p className="text-center mt-4">
                No jobs found matching your search.
              </p>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="jop w-100 rounded-2 mb-5 p-3 d-flex justify-content-between align-items-center position-relative"
                  onClick={() => handleJobClick(job)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="details">
                    <div className="name d-flex align-items-center">
                      <img src={work} alt="work image" />
                      <div className="details ms-2 mt-3">
                        <h4 className="text-dark" id="jop">
                          {job.title}
                        </h4>
                        <h6>{job.company}</h6>
                        <p>
                          <span>{job.location}</span>
                        </p>
                        <div className="btns d-flex gap-2 flex-wrap">
                          <button className="special_button">
                            {job.employment_type}
                          </button>
                          <button className="special_button">
                            {job.is_remote_work === 1
                              ? "Remote Work"
                              : "On-Site Work"}
                          </button>
                        </div>
                        <p className="mt-3">
                          <span>{job.created_at}</span>
                          <div className="dot"></div>
                          <span>{job.number_of_opening} available</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="price me-4">
                    <div className="caption">
                      <span className="light">Team</span>
                      <p className="normal">{job.job_category}</p>
                      <p>
                        <span className="special">
                          ${job.salary_to - job.salary_from || "Not specified"}
                        </span>
                        <span className="light">/Year</span>
                      </p>
                    </div>
                  </div>
                  <i className="fa-regular fa-bookmark"></i>
                </div>
              ))
            )}
          </div>
          <aside className="left rounded-2 px-3 d-flex flex-column align-items-center pt-5">
            {selectedJob ? (
              <>
                <div className="name d-flex mt-0 text-center align-items-center flex-column justify-content-center">
                  <img src="src/assets/work.png" alt="work image" />
                  <h4 className="text-dark mt-3" id="jop">
                    {selectedJob.title}
                  </h4>
                  <h6>{selectedJob.company}</h6>
                  <p className="d-block">
                    <span>{selectedJob.location}</span>
                  </p>
                </div>

                <div className="dates">
                  <p className="mt-2">
                    <i className="fa-regular fa-clock i"></i> Application
                    Deadline {selectedJob.application_deadline}
                  </p>
                  <p className="mt-2">
                    <i className="fa-regular fa-edit i"></i> Last Update{" "}
                    {selectedJob.updated_at}
                  </p>
                  <div className="btns d-flex flex-column gap-3 w-100">
                    <button className="w-100 special_button">
                      {selectedJob.employment_type}
                    </button>
                    <button className="w-100 special_button">
                      {selectedJob.is_remote_work === 1
                        ? "Remote Work"
                        : "On-Site Work"}
                    </button>
                  </div>
                </div>
                <div className="apply mt-4 w-100 d-flex justify-content-center">
                  <button className="">
                    <Link className="link" to={"/fill"}>
                      Apply Now
                    </Link>
                  </button>
                </div>

                <div className="JobDeatails d-flex flex-column align-items-start px-2 pt-4">
                  <ul>
                    <dt className="my-2">Minimum Qualifications</dt>
                    {selectedJob.qualifications ? (
                      JSON.parse(selectedJob.qualifications).map(
                        (qual, index) => <li key={index}>{qual}</li>
                      )
                    ) : (
                      <li>No qualifications specified</li>
                    )}
                  </ul>

                  <ul>
                    <dt className="my-2">Preferred qualifications:</dt>
                    <li>Strong collaboration and presentation skills.</li>
                    <li>
                      Excellent leadership, communication and teamwork skills.
                    </li>
                  </ul>
                  <ul className="">
                    <dt className="my-2">About the Job:</dt>
                    <li className="list-unstyled">{selectedJob.description}</li>
                  </ul>
                </div>
              </>
            ) : (
              ""
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
