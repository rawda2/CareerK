import React from "react";
import './PostedJobs.css'
import work from "./../../../assets/work.png";
import { Link } from 'react-router-dom';
import pers1 from './../../../assets/pers1.png'
import pers2 from './../../../assets/pers2.png'
import pers3 from './../../../assets/pers3.png'
import pers4 from './../../../assets/pers4.png'
import pers5 from './../../../assets/pers5.png'
import pers6 from './../../../assets/pers6.png'
import pers7 from './../../../assets/pers7.png'
import pers8 from './../../../assets/pers8.png'
import pers9 from './../../../assets/freelancer.png'

import { useState } from "react";

export default function PostedJobs() {
  const [current,setCurrent]=useState("jobs")
  const [selectedApplicants, setSelectedApplicants] = useState([]);

  const handleCurrent = (applicants) => {
    setSelectedApplicants(applicants);
    setCurrent("appls");
  };
  const handleBack=()=>{
    setCurrent("jobs")
  }
  const jobs = [
    {
      title: "Senior UX Designer",
      time: "15 min ago",
      type: "Full-time",
      applied: 8,
      applicants: [
        { name: "Lina Morgan", title: "UX Researcher", photo: pers9 },
        { name: "Ahmed Khaled", title: "UI/UX Designer", photo: pers9 },
        { name: "Sara Ali", title: "Visual Designer", photo: pers9 },
      ],
    },
    {
      title: "Frontend Engineer (React)",
      time: "1 hour ago",
      type: "Full-time",
      applied: 5,
      applicants: [
        { name: "John Doe", title: "React Developer", photo: pers4 },
        { name: "Mona Sharif", title: "Frontend Engineer", photo: pers1 }
      ],
    },
    {
      title: "Digital Marketing Specialist",
      time: "2 hours ago",
      type: "Contract",
      applied: 4,
      applicants: [
        { name: "Ali Raza", title: "SEO Expert", photo: pers1 },
        { name: "Jana Lee", title: "Content Strategist", photo: pers5 }
      ],
    },
    {
      title: "DevOps Engineer",
      time: "3 hours ago",
      type: "Full-time",
      applied: 3,
      applicants: [
        { name: "Chris Evan", title: "DevOps Specialist", photo: pers6 }
      ],
    },
    {
      title: "Product Manager",
      time: "5 hours ago",
      type: "Full-time",
      applied: 6,
      applicants: [
        { name: "Fatima Noor", title: "Product Lead", photo: pers7 },
        { name: "Yousef Zidan", title: "Agile Coach", photo: pers1},
      ],
    },
    {
      title: "Data Scientist",
      time: "1 day ago",
      type: "Full-time",
      applied: 7,
      applicants: [
        { name: "Layla Chen", title: "ML Engineer", photo: pers3,},
        { name: "Tariq Hassan", title: "Data Analyst", photo: pers1},
      ],
    },
    {
      title: "Customer Support Rep",
      time: "1 day ago",
      type: "Part-time",
      applied: 4,
      applicants: [
        { name: "Emily Stone", title: "Support Agent", photo: pers8},
        { name: "Mohamed Saleh", title: "Customer Success", photo: pers1 },
      ],
    },
  ];
  
  return (
    <>
      <section className="Posted px-5 pb-5 pt-2 d-flex bg-light flex-column align-items-center  justify-content-center">
        <div className="main w-90 mt-4 rounded-4  p-4 shadow mb-2 ">
    {current=="jobs"?<>     
         <h3>Posted Jobs</h3>

         <div className="postedJob ">
            <section  className=" d-flex flex-column gap-0 ">
              {jobs.map((job, index) => (
               <>
               <div className="job d-flex  justify-content-between w-100 ms-0 p-5">
                <div className="right d-flex flex-row  justify-content-center align-items-center">
                  <div className="img me-4 mt-0">
                    <img src={work} alt="" className=" logo-image" />
                    
                  </div>
                  <div className="details mt-4 d-flex flex-column align-items-start">
                    <p className=" mb-0">{job.time}</p>
                    <h6 className=" mb-0">{job.title}</h6>
                    <p >{job.type}</p>
                  </div>
                </div>
                <div className="left d-flex justify-content-center align-items-center mt-5">
                  <Link className="i text-decoration-none" onClick={() => handleCurrent(job.applicants)}>Details</Link>
                </div>
               </div>
               </>
              ))}
            </section>
          </div>
    </>:""}
    {current === "appls" && (
          <>
            <h3><i className=" fa-solid fa-arrow-left bg-transparent" onClick={handleBack}></i> Applicants</h3>
            <div className="appls">
              <section className="d-flex flex-column gap-0">
                {selectedApplicants.map((applicant, index) => (
                  <div key={index} className="job app d-flex justify-content-between w-100 ms-0 p-5">
                    <div className="right d-flex flex-row justify-content-center align-items-center">
                      <div className="img me-4 mt-0">
                        <img src={applicant.photo} alt={applicant.name} className="logo-image" />
                      </div>
                      <div className="details mt-4 d-flex flex-column align-items-start">
                        <h6 className="mb-0">{applicant.name}</h6>
                        <p>{applicant.title}</p>
                      </div>
                    </div>
                    <div className="left d-flex justify-content-center align-items-center mt-5 me-5 gap-2">
                  <Link className="i text-decoration-none btnn " >Resume</Link>

                  <Link className="i text-decoration-none Btn" >Details</Link>

                </div>

                  </div>
                ))}
              </section>
            </div>
          </>
        )}
         
        </div>
      </section>

    
    </>
  );
}
