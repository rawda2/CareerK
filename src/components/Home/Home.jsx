import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import course from './../../assets/course.png';
import home from './../../assets/home2.png';
import work from './../../assets/work.png';

export default function Home() {
  return (
    <>
      <section className="home px-lg-5 px-3 px-md-5 py-5 mt-5">
        <header className="container-fluid mt-5 px-lg-5 mb-5">
          <div className="row d-flex justify-content-between">
            <div className="right col-lg-6 col-md-6 col-12">
              <div className="title text-start">
                <h2 className="h2">
                  Find a job that suits your interest & skills.
                </h2>
                <p>
                  Aliquam vitae turpis in diam convallis finibus in at risus.
                  Nullam in scelerisque leo, eget sollicitudin velit bestibulum.
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
                  <Link className="link text-light" id="white" to={'/jops'}>
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
              <Link className="text-decoration-none" to={'/courses'}>
                See all
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </button>
          </div>
          <div className="container-fluid">
            <div className="row">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="box px-lg-2 p-1 col-lg-3 mb-2 col-md-6 col-12">
                  <div className="course m-1">
                    <img src={course} alt="Course" />
                    <div className="rate d-flex justify-content-end align-items-center mt-3 me-2">
                      <i className="fa-solid fa-star text-warning"></i>
                      <span>4.8</span>
                    </div>
                    <div className="details">
                      <h5>Course Name</h5>
                      <p>
                        Your trusted platform for online learning, powering individuals to achieve their goals.
                      </p>
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
              <Link className="text-decoration-none" to={'/jops'}>
                See all
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </button>
          </div>
          <div className="container-fluid">
            <div className="row">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="box px-lg-2 p-1 col-lg-3 mb-2 col-md-6 col-12">
                  <div className="jop shadow p-3 rounded-4 mb-3">
                    <div className="name d-flex align-items-center">
                      <img src={work} alt="Work" />
                      <div className="details ms-2 mt-3">
                        <h4>Company Name</h4>
                        <p>
                          <span>Location</span>
                          <div className="dot"></div>
                          <span>Cairo, Egypt</span>
                        </p>
                      </div>
                    </div>
                    <div className="details ms-2 mt-3">
                      <h4 className="text-dark">Email Marketing</h4>
                      <p>
                        <span className="text-dark">Job Time</span>
                        <div className="dot"></div>
                        <span>Full Time</span>
                      </p>
                    </div>
                    <p className="p">
                      Pitch is looking for Customer Manager to join marketing team...
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