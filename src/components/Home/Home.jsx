import { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import course from "./../../assets/course.png";
import home from "./../../assets/home2.png";
import work from "./../../assets/work.png";
import C1 from "../../assets/C1.jpg";
import C2 from "../../assets/C2.jpg";
import C3 from "../../assets/C3.jpg";
import C4 from "../../assets/C4.jpg";

import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  // const CoursesImg = [C1, C2, C3, C4,C1, C2, C3, C4];
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [Jobs, setJobs] = useState([]);

  useEffect(() => {
    const getHome = async () => {
      try {
        const response = await axios.get(`${API_URL}/developer/courses`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setCourses(response.data);
      } catch (error) {
        console.error("Error get Developer Home ", error);
      }
    };
    getHome();
  }, []);
    useEffect(() => {
    const getHome = async () => {
      try {
        const response = await axios.get(`${API_URL}/job-post/get-job-posts`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.jobs);
        setJobs(response.data.jobs)
      } catch (error) {
        console.error("Error get Developer Home ", error);
      }
    };
    getHome();
  }, []);
  return (
    <>
      <section className="home px-lg-5 px-3 px-md-5 py-2 pb-5">
        <header className="container-fluid mt-5 px-lg-5 mb-5">
          <div className="row d-flex justify-content-between">
            <div className="right col-lg-6 col-md-6 col-12">
              <div className="title text-start">
                <h2 className="h2">
                  Find a job that suits your interest & skills.
                </h2>
                <p>
                  Explore thousands of job listings tailored to your skills and
                  passion. Whether you're just starting out or looking to take
                  the next big step, we help connect you with employers who
                  value your potential.
                </p>
              </div>
              <div className="search w-100 py-3 px-5 border-1 rounded-1 shadow mt-5 d-flex align-items-center">
                <i className="fa-solid fa-magnifying-glass fa-xl i"></i>
                <input
                  type="search"
                  className="fa-search border-0 py-2 px-3"
                  placeholder="Job title, Keyword..."
                />
                <button className="find Btn text-light">
                  <Link className="link text-light" id="white" to={"/jops"}>
                    Find Work
                  </Link>
                </button>
              </div>
            </div>
            <div className="left col-lg-5 col-md-5 col-12">
              <img src={home} alt="Home" />
            </div>
          </div>
        </header>

        <section className="services container-fluid mt-5 px-lg-5 mb-5">
          <div className="row justify-content-between">
            <div className="service col-lg-3 mb-2 col-md-6 mb-3 justify-content-md-center col-12">
              <div className="main shadow p-4 rounded-3">
                <i className="fa-solid fa-graduation-cap"></i>
                <span>Courses</span>
              </div>
            </div>
            <div className="service col-lg-3 col-md-6 mb-3 justify-content-md-center col-12">
              <div className="main shadow p-4 rounded-3">
                <i className="fa-solid fa-location-arrow"></i>
                <span>Road Maps</span>
              </div>
            </div>
            <div className="service col-lg-3 col-md-6 mb-3 justify-content-md-center col-12">
              <div className="main shadow p-4 rounded-3">
                <i className="fa-solid fa-business-time"></i>
                <span>Find Work</span>
              </div>
            </div>
            <div className="service col-lg-3 col-md-6 mb-3 justify-content-md-center col-12">
              <div className="main shadow p-4 rounded-3">
                <i className="fa-solid fa-globe"></i>
                <span>Community</span>
              </div>
            </div>
          </div>
        </section>

        <section className="courses mt-5 px-lg-5">
          <div className="head d-flex justify-content-between mt-5 mb-5">
            <h4 className="hBold">Courses</h4>
            <button className="px-4 rounded py-1 bg-body">
              <Link className="text-decoration-none" to={"/courses"}>
                See all
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </button>
          </div>
          <div className="container-fluid">
            <div className="row">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="box px-lg-2 p-1 col-lg-3 mb-2 col-md-6 col-12"
                >
                  <div className="course m-1">
                    <img
                      src={course.image_url}
                      alt={course.name || "Course"}
                    />
                    <div className="rate d-flex justify-content-end align-items-center mt-3 me-2">
                      <i className="fa-solid fa-star text-warning"></i>
                      <span>{course.rating}</span>
                    </div>
                    <div className="details">
                      <h5>{course.name}</h5>
                      <p>{course.description} </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="work mt-5 px-lg-5">
          <div className="head d-flex justify-content-between mt-5 mb-5">
            <h4 className="hBold">Find Work</h4>
            <button className="px-4 rounded py-1 bg-body">
              <Link className="text-decoration-none" to={"/jops"}>
                See all
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </button>
          </div>
          <div className="container-fluid">
            <div className="row">
              {Jobs.slice(0, 8).map((job, index) => (
                <div
                  key={index}
                  className="box px-lg-2 p-1 col-lg-3 mb-2 col-md-6 col-12"
                >
                  <div className="jop shadow p-2 rounded-4 mb-3">
                    <div className="name d-flex align-items-center">
                      <img src={work} alt="Work" />
                      <div className="details ms-2 mt-3">
                        <h4>{job.company_name}</h4>
                        <p>
                          <span>Location</span>
                          <div className="dot"></div>
                          <span>{job.location}</span>
                        </p>
                      </div>
                    </div>
                    <div className="details  mt-3">
                      <h4 className="text-dark">{job.title}</h4>
                      <p>
                        <span className="text-dark ms-0">Job Time</span>
                        <div className="dot"></div>
                        <span>{job.job_type}</span>
                      </p>
                    </div>
                    <p className="p line-clamp">
                     {job.job_description}
                    </p>
                    <button className="special_button">OnSite</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
